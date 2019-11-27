<template>
  <div class="text-slider-container">
    <div v-if="swipeIcon" class="swipe-icon">
      <swipe-icon />
    </div>

    <div
      :is="slickComponent"
      v-if="items && items.length"
      ref="slick"
      :options="slickOptions"
      class="text-slider"
    >
      <div v-for="(item, index) in items" :key="index" class="text-slide">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
import SwipeIcon from '@/assets/icons/SwipeIcon.svg'

export default {
  components: { Slick: () => import('vue-slick'), SwipeIcon },
  props: {
    items: {
      type: Array,
      required: true
    },
    slickOptions: {
      type: Object,
      default: () => {}
    },
    swipeIcon: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      slickComponent: ''
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.slickComponent = 'Slick'
    })
  },
  beforeUpdate() {
    this.$nextTick(function() {
      if (this.$refs.slick) {
        // Hide swipe icon

        if (this.$refs.slick.$el.parentNode.querySelector('.swipe-icon')) {
          this.$refs.slick.$el.parentNode
            .querySelector('.swipe-icon')
            .classList.remove('active')
        }

        // Destroy Slick slider

        this.$refs.slick.destroy()
      }
    })
  },
  updated() {
    this.$nextTick(function() {
      if (this.$refs.slick) {
        // Create Slick slider

        this.$refs.slick.create()

        // Display swipe icon

        const slick = this.$refs.slick.$el

        if (
          slick.clientWidth ===
            slick.querySelector('.slick-list').clientWidth &&
          slick.parentNode.querySelector('.swipe-icon')
        ) {
          slick.parentNode.querySelector('.swipe-icon').classList.add('active')
        }
      }
    })
  }
}
</script>

<style lang="scss">
.text-slider-container {
  display: block;
  position: relative;
  max-width: 100%;

  .swipe-icon {
    display: none;
    position: absolute;
    top: -36px;
    right: fit(42);
    width: 22px;
    height: 24px;

    &.active {
      display: block;
    }
  }

  .text-slider {
    display: flex;
  }

  .slick-list {
    display: flex;
    flex: initial;
    align-items: center;
    position: relative;
    width: auto;
    height: 42px;
    padding: 0;
    border-top-left-radius: 14px;
    border-bottom-left-radius: 14px;
    font-family: $font;
    font-size: 14px;
    letter-spacing: 0.8px;
    color: #ffffff;
    overflow: hidden;
  }

  .slick-track {
    display: flex;
    opacity: 0.6 !important;
    width: auto !important;
    height: 100%;
    border-radius: 14px;
    background: linear-gradient(60deg, #684f78 0%, #e26479 100%);
  }

  .slick-slide {
    display: flex;
    flex: initial;
    align-items: center;
    height: 100%;
    padding: 0 fit(40);
    border-right: 1px #f2e3d3 solid;
    list-style: none;
    white-space: nowrap;

    &:last-child {
      border-right: none;
    }
  }
}
</style>
