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
                {{ $t(option.label) }}
              </div>
              <div class="list-slider__list__item__value">
                {{ option.area }}
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
export default {
  data() {
    return {
      list: this.$store.getters['Flats/roomsList'],
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
      const items = []
      const raw = this.$store.getters['Flats/roomsList']
      let length = raw.length
      if (raw.length % 9 !== 0) {
        length = (parseInt(raw.length / 9) + 1) * 9
      }

      for (let i = 9; i <= length; i += 9) {
        if (raw.lenght < i + 9) {
          items.push(raw.slice(i - 9, -1))
        } else {
          items.push(raw.slice(i - 9, i))
        }
      }
      return items
    }
  },
  methods: {
    turnToLeadingZero(number) {
      return number > 9 ? number : '0'.concat(number)
    }
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
