<template>
  <div v-swiper:mySwiper="swiperOption" class="swiper-image-slider">
    <div class="swiper-wrapper">
      <div v-for="image in images" :key="image.key" class="swiper-slide">
        <img :src="image.url" />
      </div>
    </div>
    <div v-if="slidesNumber > 1" class="swiper-pagination"></div>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      required: true,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        }
      },
      slidesNumber: 0
    }
  },
  mounted() {
    this.slidesNumber = this.$el.getElementsByClassName('swiper-slide').length
  }
}
</script>

<style lang="scss" scoped>
.swiper-image-slider {
  width: 100%; /* 1648px */
  height: fit(460); /* 460px */
  border-top-left-radius: fit(70); /* 70px */

  .swiper-slide::after {
    content: '';
    position: absolute;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background: rgb(207, 69, 9);
    background: linear-gradient(
      60deg,
      rgba(207, 69, 9, 0.35) 0%,
      rgba(245, 165, 69, 0.35) 100%
    );
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
}
</style>

<style lang="scss">
.swiper-image-slider {
  .swiper-pagination {
    position: absolute;
    bottom: fit(42); /* 42px */
    left: 50%;
    z-index: 10;
    transform: translate3d(-50%, 0, 0);
  }

  .swiper-pagination-bullet {
    width: fit(18); /* 18px */
    height: fit(18); /* 18px */
    margin: 0 fit(13); /* 0 13px */
    background: #ffffff;
    opacity: 0.7;
    cursor: pointer;
  }

  .swiper-pagination-bullet-active {
    background: #ffffff;
    opacity: 1;
  }
}
</style>
