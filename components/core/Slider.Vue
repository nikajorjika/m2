<template>
  <!-- You can find this swiper instance object in current component by the "mySwiper"  -->
  <div v-swiper:mySwiper="swiperOption">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item, index) in items" :key="item.key">
        <div class="swiper_content">
          <div class="swiper__content__title">
            <span>{{ "0" + (index+1) }}</span>
            <span>/</span>
            <span>10</span>
          </div>
        </div>
        <img :src="item.image" />
      </div>
    </div>
    <div class="swiper-pagination swiper-pagination-bullets"></div>
  </div>
</template>

<script>
export default {
  props: ['items'],
  data() {
    return {
      swiperOption: {
        loop: true,
        slidesPreview: 3,
        centeredSlides: true,
        spaceBetween: 30,
        on: {
          slideChange() {
            console.log('onSlideChangeEnd', this)
          },
          tap() {
            console.log('onTap', this)
          }
        }
      }
    }
  },
  mounted() {
    this.mySwiper.slideTo(1)
  }
}
</script>


<style lang="scss" scoped>
.swiper-container {
  width: 680px;
  border-radius: 10px 0 0 10px;
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