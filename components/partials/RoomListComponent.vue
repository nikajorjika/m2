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
            >
              <div class="list-slider__list__item__number">
                {{ turnToLeadingZero(index * 9 + (key + 1)) }}
              </div>
              <div class="list-slider__list__item__label">
                {{ option.name_label && option.name_label.hasOwnProperty(locale) ? option.name_label[locale] : $t(`rooms.${option.name}`) }}
              </div>
              <div class="list-slider__list__item__value">
                {{`${option.number} ${$t('labels.m2')}`}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { turnToLeadingZero, sliceUpArray } from '@/utils/Mixed'
export default {
  props: {
    roomList: {
      type: Array
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
    items() {
      return sliceUpArray(this.roomList, 9)
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
      width: 82%;
      overflow: hidden;
    }
    &__item {
      display: flex;
      margin: 9px 0;
      align-items: center;
      &__number {
        background: #fff;
        border-radius: 10px;
        padding: 10px;
        margin-right: 45px;
        color: #4b3f99;
        font-size: 9px;
        line-height: 1;
      }
      &__value {
        margin-left: auto;
        font-family: $font;
        font-size: 13px;
        color: #4b3f99;
      }
      &__label {
        font-family: $font;
        font-size: 13px;
        color: #494949;
      }
    }
  }
}
</style>

<style lang="scss">
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
</style>
