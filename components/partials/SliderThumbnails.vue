<template>
  <div class="slider-thumbnails-container">
    <ul class="slider-thumbnails">
      <li
        v-for="(item, index) in items"
        :key="item.id"
        :class="['slider-thumbnail', activeElIndex === index ? 'active' : '']"
        @click="selectItem"
      >
        <span class="index" v-text="normalizeIndex(index)"></span>

        <figure>
          <img :src="image(item)" class="image" alt="Thumbnail" />

          <figcaption class="caption">{{ item.name }}</figcaption>

          <div class="checkbox">
            <span></span>
          </div>
        </figure>
      </li>
    </ul>
  </div>
</template>

<script>
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
  methods: {
    normalizeIndex(index) {
      index += 1

      return `0${index}`.slice(-2)
    },
    image(item) {
      return item.images && item.images[0] ? item.images[0].url : null
    },
    selectItem(event) {
      // Remove old active class

      this.$el
        .querySelector('.slider-thumbnail.active')
        .classList.remove('active')

      // Set active class

      event.target.closest('.slider-thumbnail').classList.add('active')

      // Set active element index

      this.$el.querySelectorAll('.slider-thumbnail').forEach((el, index) => {
        if (el.classList.contains('active')) {
          this.activeElIndex = index
        }
      })

      // Emit custom event

      this.$emit('thumbnailChanged', this.activeElIndex)
    }
  }
}
</script>

<style lang="scss" scoped>
.slider-thumbnails-container {
  margin-top: 62px;
}

.slider-thumbnails {
}

.slider-thumbnail {
  display: flex;
  margin-bottom: fit(40);

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
    height: fit(80);
    border-top-left-radius: 25px;
    border-bottom-right-radius: 25px;
    background-color: #ffffff;
    overflow: hidden;
  }

  .image {
    width: fit(142);
    height: 100%;
    object-fit: contain;
  }

  figcaption {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: fit(210);
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
      margin-right: 22px;
      font-size: 24px;
      color: rgba(60, 34, 112, 1);
    }

    figure {
      width: fit(421);
      height: fit(90);
      box-shadow: 0 4px 32px rgba(242, 101, 41, 0.1);
    }

    .image {
      width: fit(151);
    }

    .checkbox {
      visibility: visible;
      width: fit(84);
    }
  }
}
</style>
