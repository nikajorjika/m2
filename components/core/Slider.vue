<template>
  <!-- You can find this swiper instance object in current component by the "mySwiper"  -->
  <div
    v-swiper:mySwiper="swiperOption"
    class="swiper__container"
    @slideChange="sendMessageToParent()"
  >
    <div class="swiper__pagination">
      <div
        class="swiper__pagination__button swiper__pagination__button--prev"
        @click="prevSlide"
      >
        <ArrowRight :icon-color="activeIndex === 0 ? '#f0bda2' : '#ec7547'" />
      </div>
      <div
        class="swiper__pagination__button swiper__pagination__button--next"
        @click="nextSlide"
      >
        <ArrowRight
          :icon-color="activeIndex === items.length - 1 ? '#f0bda2' : '#ec7547'"
        />
      </div>
    </div>
    <div class="swiper-wrapper">
      <div v-for="(item, index) in items" :key="item.key" class="swiper-slide">
        <div class="swiper__content">
          <div class="swiper__content__title">
            <span>{{ '0' + (index + 1) }}</span>
            <span>/ {{ '0' + items.length }}</span>
          </div>
        </div>
        <div
          :style="{ backgroundImage: `url(${item.image.url})` }"
          class="swiper__image"
        ></div>
        <div class="swiper__maximaze-item">
          <maximize-image
            :image="item.image.url"
            width="47px"
            height="47px"
            icon-color="#f7ac8b"
            bg-color="#fff"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArrowRight from '@/components/icons/ArrowRight'
import MaximizeImage from '@/components/partials/MaximizingImage'
export default {
  components: {
    ArrowRight,
    MaximizeImage
  },
  props: ['items'],
  data() {
    return {
      swiperOption: {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 30,
        on: {}
      }
    }
  },
  computed: {
    activeIndex() {
      return this.mySwiper !== undefined ? this.mySwiper.activeIndex : 0
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
  max-width: 100%;
  border-radius: 10px 0 0 10px;
  position: relative;
  .swiper__pagination {
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
    .swiper__image {
      width: 100%;
      padding-top: 56%;
      background-size: cover;
      background-position: center center;
    }
    .swiper__content {
      position: absolute;
      bottom: 0;
      left: 0;
      background: #ffffff;
      border-top-right-radius: 10px;
      padding: 25px 40px;
      &__title {
        color: #3c2270;
        opacity: 0.8;
        font-size: 20px;
        font-weight: bold;
        span:last-child {
          opacity: 0.2;
        }
      }
    }
    .swiper__maximaze-item {
      position: absolute;
      right: 20px;
      top: 20px;
    }
  }
}
</style>
