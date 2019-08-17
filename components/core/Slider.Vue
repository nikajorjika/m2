<template>
  <!-- You can find this swiper instance object in current component by the "mySwiper"  -->
  <div
    v-swiper:mySwiper="swiperOption"
    class="swiper__container"
    @slideChange="sendMessageToParent()"
  >
    <div class="swiper__pagination">
      <div class="swiper__pagination__button swiper__pagination__button--prev" @click="prevSlide">
        <ArrowRight icon-color="#f0bda2" />
      </div>
      <div class="swiper__pagination__button swiper__pagination__button--next" @click="nextSlide">
        <ArrowRight icon-color="#f0bda2" />
      </div>
    </div>
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item, index) in items" :key="item.key">
        <div class="swiper_content">
          <div class="swiper__content__title">
            <span>{{ "0" + (index+1) }}</span>
            <span>/</span>
            <span>{{ "0" + items.length }}</span>
          </div>
        </div>
        <img :src="item.image" />
      </div>
    </div>
  </div>
</template>

<script>
import ArrowRight from '@/components/icons/ArrowRight'
export default {
  props: ['items'],
  components: {
    ArrowRight
  },
  data() {
    return {
      swiperOption: {
        centeredSlides: true,
        spaceBetween: 30,
        on: {
          slideChange() {},
          tap() {
            console.log('onTap', this)
          }
        }
      }
    }
  },
  methods: {
    nextSlide() {
      this.mySwiper.slideNext()
    },

    prevSlide() {
      this.mySwiper.slidePrev()
    },

    sendMessageToParent(event) {
      this.$emit('messageFromSlider', this.mySwiper.activeIndex)
    }
  }
}
</script>


<style lang="scss" scoped>
.swiper__container {
  width: 680px;
  border-radius: 10px 0 0 10px;
  position: relative;
  .swiper__pagination {
    margin-bottom: 30px;
    &__button {
      cursor: pointer;
      padding: 20px 0 20px 20px;
      &--prev {
        float: left;
        transform: rotate(180deg);
      }
      &--next {
        float: right;
      }
    }
  }
  .swiper-slide {
    .swiper_content {
      position: absolute;
      bottom: 0;
      left: 0;
      background: #ffffff;
      border-top-right-radius: 10px;
      padding: 25px 40px;
    }
  }
}
</style>