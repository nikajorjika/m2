<template>
  <div class="container">
    <div class="title">
      <title-with-border :title="$t('titles.SupplyPageTitle')" />
    </div>
    <div v-swiper:mySwiper="swiperOption" class="swiper__container">
      <div class="swiper-wrapper">
        <div v-for="item in itemsData" :key="item.id" class="swiper-slide">
          <div class="items">
            <div v-for="value in item" :key="value.id" class="item">
              <TechnicCard :item="value" />
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-pagination" :class="{ disabled: disableBullet }"></div>
    </div>
  </div>
</template>

<script>
import TechnicCard from '@/components/core/TechnicCard'
import TitleWithBorder from '@/components/partials/TitleWithLine'
import { mapGetters } from 'vuex';
export default {
  components: {
    TechnicCard,
    TitleWithBorder
  },
  layout: 'RenovationsLayout',
  middleware: 'chosenFlat',
  data() {
    return {
      swiperOption: {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          watchOverflow: true
        },
        on: {}
      }
    }
  },

  computed: {
    ...mapGetters('Flats', ['flat']),
    items() {
      return this.flat.appliance.appliance_info
    },
    itemsData() {
      const arr = []
      for (let i = 0; i < this.items.length; i = i + 3) {
        arr.push(this.items.slice(i, i + 3))
      }
      return arr
    },

    disableBullet() {
      return this.items.length <= 3
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding-top: 53px;
  padding-bottom: 50px;
}
.swiper__container {
  padding-bottom: 30px;
  .swiper-pagination {
    justify-content: center;
    &.disabled {
      display: none;
    }
  }
}
.title {
  font-family: $font-caps;
  margin-left: 33px;
  margin-bottom: 40px;
}
.items {
  display: flex;
  justify-content: flex-start;
  flex-flow: wrap;
  .item {
    width: 300px;
    margin: 0 auto;
  }
}
</style>
