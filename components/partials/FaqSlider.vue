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
                turnToLeadingZero(index * 3 + (i + 1))
              }}</span>
              <span>{{ labelOrLocaledLabel(question, 'title') }}</span>
            </h3>
            <p>{{ labelOrLocaledLabel(question, 'content') }}</p>
          </div>
        </div>
      </div>
      <div v-if="items.length > 1" class="swiper-pagination"></div>
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
      },
      questionsNumber: 0
    }
  },
  computed: {
    ...mapGetters({
      locale: 'locale',
      questionList: 'FAQ/questionList'
    }),
    items() {
      return sliceUpArray(this.questionList, 3)
    }
  },
  mounted() {
    if (!this.questionList.length) {
      this.fetchFAQ()
      this.questionsNumber = this.questionList.length
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
  }
  .swiper-wrapper {
    height: calc(100% - 36px);
  }
  &__swiper-slide {
    margin-bottom: 10px;
    &__numeration {
      margin-right: 20px;
      background: #fff;
      padding: 7px 6px 4px;
      border-radius: 6px;
      align-self: baseline;
      font-size: 13px;
    }
    h3 {
      color: #ed7c4d;
      font-family: $font-caps;
      font-size: 14px;
      letter-spacing: 0.3px;
      word-spacing: 1px;
      font-weight: bold;
      line-height: 1.5;
      display: flex;
      align-items: center;
      margin-top: 20px;
      span {
        line-height: 1;
      }
      span:last-child {
        padding-top: 3px;
        line-height: 1.7;
      }
    }
    p {
      color: #494949;
      font-family: $font;
      font-size: 13px;
      letter-spacing: 0.2px;
      word-spacing: 4px;
      line-height: 1.5;
      margin-top: 10px;
    }
  }
}
</style>
<style lang="scss">
.faq-slider {
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
