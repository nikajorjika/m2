<template>
  <div class="faq-slider">
    <div ref="faqSwiper" v-swiper:faqSwiper="swiperOption">
      <div class="swiper-wrapper">
        <div
          v-for="(questions, index) in items"
          :key="index"
          class="swiper-slide swiper-page"
        >
          <div
            v-for="(question, i) in questions"
            :key="i"
            class="faq-slider__swiper-slide"
          >
            <h3>
              <span class="faq-slider__swiper-slide__numeration">{{
                turnToLeadingZero(index * 4 + (i + 1))
              }}</span>
              <span>{{ labelOrLocaledLabel(question, 'title') }}</span>
            </h3>
            <p>{{ labelOrLocaledLabel(question, 'content') }}</p>
          </div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { turnToLeadingZero, sliceUpArray } from '@/utils/Mixed'

export default {
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
    ...mapGetters({
      locale: 'locale',
      questionList: 'FAQ/questionList'
    }),
    items() {
      return sliceUpArray(this.questionList, 4)
    }
  },
  mounted() {
    if (!this.questionList.length) {
      this.fetchFAQ()
    }
  },
  methods: {
    ...mapActions('FAQ', ['fetchFAQ']),
    turnToLeadingZero,
    labelOrLocaledLabel(item, label) {
      return item[label].hasOwnProperty(this.locale)
        ? item[label][this.locale]
        : item[label]
    }
  }
}
</script>
<style lang="scss" scoped>
.faq-slider {
  overflow: hidden;
  margin-top: 20px;
  height: calc(100% - 51px);
  .swiper-page {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
  .swiper-wrapper {
    height: calc(100% - 36px);
  }
  &__swiper-slide {
    &__numeration {
      margin-right: 20px;
      background: #fff;
      font-size: 9px;
      padding: 7px 6px;
      border-radius: 6px;
      align-self: baseline;
    }
    h3 {
      color: #ed7c4d;
      display: flex;
      font-family: $font-caps;
      font-size: 12px;
      letter-spacing: 0.3px;
      word-spacing: 1px;
      font-weight: 500;
      line-height: 1.5;
      display: flex;
      align-items: center;
      span {
        line-height: 1;
      }
    }
    p {
      color: #494949;
      font-family: $font;
      font-size: 12px;
      letter-spacing: 1px;
      word-spacing: 4px;
      line-height: 1.5;
      margin-top: 20px;
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
