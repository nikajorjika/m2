<template>
  <div class="list-slider">
    <div ref="roomSlider" v-swiper:roomSlider="swiperOption">
      <div class="swiper-wrapper list-slider__list">
        <div v-for="(item, index) in items" :key="index" class="swiper-slide">
          <div class="list-slider__list__container">
            <div
              v-for="(option, key) in item"
              :key="key"
              class="list-slider__list__item"
              :class="styleType"
            >
              <div class="list-slider__list__item__number" :class="styleType">
                {{ turnToLeadingZero(index * 9 + (key + 1)) }}
              </div>
              <div class="list-slider__list__item__label" :class="styleType">
                {{ option.label }}
              </div>
              <div class="list-slider__list__item__value">
                {{ `${option.value}` }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="length" class="swiper-pagination"></div>
    </div>
  </div>
</template>
<script>
import { turnToLeadingZero, sliceUpArray } from '@/utils/Mixed'
export default {
  props: {
    roomList: {
      type: Array,
      default: () => []
    },
    styleType: {
      type: String,
      default: 'normal'
    }
  },
  data() {
    return {
      swiperOption: {
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  },
  computed: {
    length() {
      return this.roomList.length > 9
    },
    items() {
      return this.roomList.length ? sliceUpArray(this.roomList, 9) : []
    }
  },
  methods: {
    turnToLeadingZero
  }
}
</script>
<style lang="scss" scoped>
.list-slider {
  .swiper-pagination {
    bottom: 11px;
    left: 45%;
    display: flex;
    span {
      margin: 0 5px;
    }
  }
  &__list {
    padding: 30px 45px 40px 40px;
    height: 100%;
    box-sizing: border-box;
    &__container {
      width: 78%;
      overflow: hidden;
    }
    &__item {
      display: flex;
      margin: 9px 0;
      align-items: center;
      &.small {
        margin: 18px 0;
        &:first-child {
          margin-top: 5px;
        }
      }
      &__number {
        background: #fff;
        border-radius: 10px;
        padding: 11px 10px 9px;
        margin-right: 45px;
        color: #4b3f99;
        font-size: 11px;
        font-weight: bold;
        line-height: 1;
        letter-spacing: 1px;
        &.small {
          margin-right: 11px;
          padding: 6px;
        }
      }
      &__value {
        margin-left: auto;
        font-family: $font;
        font-size: 13px;
        color: #4b3f99;
        letter-spacing: 0.6px;
      }
      &__label {
        font-family: $font;
        font-size: 13px;
        letter-spacing: 1px;
        color: #494949;
      }
    }
  }
}
</style>

<style lang="scss">
.list-slider {
  .swiper-container {
    height: 100%;
  }
  .swiper-pagination {
    display: flex;
    span {
      width: 10px;
      height: 10px;
    }
    .swiper-pagination-bullet {
      background: #4b3f99;
      opacity: 0.15;
      margin-right: 6px;
      &.swiper-pagination-bullet-active {
        background: #4b3f99;
        opacity: 0.5;
      }
    }
  }
}
</style>
