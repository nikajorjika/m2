<template>
  <div v-swiper:mySwiper="swiperOption" class="swiper-image-slider">
    <div class="swiper-wrapper">
      <div v-for="image in images" :key="image.key" class="swiper-slide">
        <img :src="image.url" />
      </div>
    </div>

    <div class="swiper-pagination"></div>
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
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper-image-slider {
  width: 92.29%; /* 1648px */
  height: 42.59vh; /* 460px */

  .swiper-slide::after {
    content: '';
    position: absolute;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    border-top-left-radius: 70px;
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
    border-top-left-radius: 70px;
    object-fit: cover;
    object-position: center;
  }

  /* Bullets */

  .swiper-pagination {
    position: absolute;
    bottom: 0;
    left: 50%;
    z-index: 10;
    transform: translate3d(-50%, 0, 0);
  }

  /*.swiper-pagination-bullet-style {*/
  /*  width: 18px;*/
  /*  height: 18px;*/
  /*  background-color: #ffffff;*/
  /*}*/
}
</style>
