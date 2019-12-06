<template>
  <div class="slider-thumbnails-container">
    <ul class="slider-thumbnails">
      <li
        v-for="(item, index) in items"
        :key="item.id"
        :data-id="item.id"
        :class="['slider-thumbnail', activeElIndex === index ? 'active' : '']"
        @click="selectItem(item, index, $event)"
      >
        <span class="index" v-text="normalizeIndex(index)"></span>

        <figure>
          <img :src="image(item, index)" class="image" alt="Thumbnail" />

          <figcaption class="caption">{{ item.name.hasOwnProperty(locale) ? item.name[locale] : item.name }}</figcaption>

          <div class="checkbox">
            <span></span>
          </div>
        </figure>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      activeElIndex: 0
    }
  },
  computed: {
    ...mapGetters({
      locale: 'locale',
      renovationId: 'customize/renovationId',
      furnitureId: 'customize/furnitureId',
      decorationId: 'customize/decorationId'
    })
  },
  mounted() {
    if (this.storeMutationIsRequired()) {
      this.mutateStore(this.items[0].id)
    }
  },
  methods: {
    normalizeIndex(index) {
      index += 1

      return `0${index}`.slice(-2)
    },
    image(item, index) {
      return item.images && item.images[0]
        ? item.images[0].full_url
        : index !== 4
        ? 'https://placehold.it/150x75'
        : require('@/assets/icons/custom-renovation.png')
    },
    selectItem(item, index, event) {
      // Remove old active class

      this.$el
        .querySelector('.slider-thumbnail.active')
        .classList.remove('active')

      // Set active class

      event.target.closest('.slider-thumbnail').classList.add('active')

      // Set active element index

      this.activeElIndex = index

      // Mutate store value

      this.mutateStore(item.id)

      // Emit custom event

      this.$emit('thumbnailChanged', this.activeElIndex)
    },
    mutateStore(id) {
      switch (this.$route.params.page) {
        case 'makeover':
          this.$store.commit('customize/SET_RENOVATION_ID', id)
          break
        case 'furniture':
          this.$store.commit('customize/SET_FURNITURE_ID', id)
          break
        case 'decoration':
          this.$store.commit('customize/SET_DECORATION_ID', id)
          break
      }
    },
    storeMutationIsRequired() {
      switch (this.$route.params.page) {
        case 'makeover':
          return !this.renovationId
        case 'furniture':
          return !this.furnitureId
        case 'decoration':
          return !this.decorationId
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.slider-thumbnails-container {
  margin-top: 34px;
}

.slider-thumbnails {
  display: grid;
  grid-gap: 15px;
}

.slider-thumbnail {
  display: flex;

  .index {
    display: flex;
    align-items: center;
    margin-right: 42px;
    font-family: 'Roboto';
    font-size: 14px;
    line-height: 30px;
    font-weight: 700;
    color: rgba(60, 34, 112, 0.5);
    transition: all 200ms ease;
  }

  figure {
    display: flex;
    align-items: center;
    width: fit(396);
    height: fit(77);
    border-top-left-radius: 25px;
    border-bottom-right-radius: 25px;
    background-color: #ffffff;
    overflow: hidden;
    transform-style: preserve-3d;
    backface-visibility: hidden;
    transform: translate3d(0, 0, 0);
    transition: transform 300ms linear;
  }

  .image {
    width: fit(142);
    height: 100%;
    object-fit: cover;
  }

  figcaption {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: flex-end;
    width: fit(210);
  }

  &:last-child figcaption::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -1px;
    width: 1px;
    height: 200%;
    background-color: #cfc8dd;
  }

  .caption {
    font-size: 14px;
    line-height: 20px;
    text-align: right;
    color: #494949;
  }

  .checkbox {
    visibility: hidden;
    display: flex;
    justify-content: center;
    width: fit(71);

    span {
      display: block;
      position: relative;
      width: fit(37);
      height: fit(37);
      border: 1px dotted #f26529;
      border-radius: 8px;

      &::after {
        content: '';
        position: absolute;
        top: 4px;
        left: 9px;
        z-index: 1;
        width: 6px;
        height: 12px;
        border: solid #f26529;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
    }
  }

  &.active {
    .index {
      color: rgba(60, 34, 112, 1);
      transform: scale(1.5);
    }

    figure {
      box-shadow: 0 4px 32px rgba(242, 101, 41, 0.1);
      transform: scale(1.06, 1.05);
    }

    .checkbox {
      visibility: visible;
      width: fit(84);
    }
  }
}
</style>
