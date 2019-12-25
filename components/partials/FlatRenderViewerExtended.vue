<template>
  <div class="flat-view">
    <div class="flat-view__header">
      <div class="flat-view__header__label">
        <gradient-label :text="bedroomCountLabel" class="label" />
      </div>

      <maximize-image :image="imageToMaximize" width="47px" height="47px" />
    </div>

    <div class="flat-view__image">
      <img
        v-for="(image, index) in images"
        :key="index"
        :src="image"
        :class="{ active: activeElIndex === index }"
        alt="Image"
      />
    </div>

    <div class="flat-view__footer">
      <div class="switch">
        <div class="switch__inner">
          <div
            class="switch__inner__toggle"
            :style="{
              backgroundColor: toggleStyle.backgroundColor,
              left: `${toggleStyle.left}%`
            }"
          ></div>

          <div
            v-for="(label, index) in labels"
            :key="index"
            class="switch__inner__item"
            :style="{
              color: activeElIndex === index ? activeColor : inactiveColor
            }"
            @click="onSwitcherClick"
          >
            {{ label }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import gradientLabel from '@/components/partials/GradientLabel'
import MaximizeImage from '@/components/partials/MaximizingImage'

export default {
  components: { gradientLabel, MaximizeImage },
  props: {
    images: {
      type: Array,
      required: true
    },
    gradientText: {
      type: Object,
      required: true
    },
    bgColor: {
      type: [String],
      default: '#f2652926'
    },
    btnColor: {
      type: [String],
      default: '#f26529'
    },
    inactiveColor: {
      type: [String],
      default: '#f26529'
    },
    activeColor: {
      type: [String],
      default: '#ffffff'
    }
  },
  data() {
    return {
      activeElIndex: 0,
      labels: [
        this.$t('labels.Render'),
        this.$t('labels.Plan'),
        this.$t('labels.FloorPlan')
      ]
    }
  },
  computed: {
    ...mapGetters(['locale']),
    bedroomCountLabel() {
      return this.gradientText.hasOwnProperty(this.locale)
        ? this.gradientText[this.locale]
        : this.gradientText
    },
    imageToMaximize() {
      return this.images[this.activeElIndex]
    },
    toggleStyle() {
      return {
        backgroundColor: this.btnColor,
        left: this.activeElIndex * 33.33
      }
    }
  },
  methods: {
    onSwitcherClick(event) {
      this.activeElIndex = this.getElIndex(event.target)
    },
    getElIndex(element) {
      return Array.from(element.parentNode.children).indexOf(element) - 1 // Start index from zero
    }
  }
}
</script>

<style lang="scss" scoped>
.flat-view {
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 17px;
  height: 100%;
  border-top-left-radius: 17px;
  border-bottom-left-radius: 17px;

  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  &__image {
    height: 56%;

    img {
      display: none;
      width: 100%;
      height: 100%;
      object-fit: contain;

      &.active {
        display: inline;
      }
    }
  }

  &__footer {
    margin: 16px auto 0;
    display: flex;
    justify-content: center;
    width: calc(100% - 16px);
  }
}

.switch {
  display: flex;
  width: 100%;
  height: 55px;

  &__inner {
    display: flex;
    position: relative;
    width: 100%;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -8px;
      width: calc(100% + 16px);
      height: 100%;
      border-radius: 38px;
      background-color: #f2652926;
    }

    &__item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 33.33%;
      height: 100%;
      padding: 4px 0 0;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 1px;
      border-radius: 38px;
      position: relative;
      z-index: 1;
      font-family: $font-caps;
    }

    &__toggle {
      width: 33%;
      height: calc(100% - 16px);
      background-color: rgb(242, 101, 41);
      position: absolute;
      z-index: 0;
      border-radius: 38px;
      top: 8px;
      left: 0;
      transition: left 0.2s;
    }
  }
}
</style>
