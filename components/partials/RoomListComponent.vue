<template>
  <div class="list-slider">
    <div class="list-slider__list">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="list-slider__list__item"
      >
        <div class="list-slider__list__item__number">
          {{ turnToLeadingZero(index + 1) }}
        </div>
        <div class="list-slider__list__item__label">{{ $t(item.label) }}</div>
        <div class="list-slider__list__item__value">{{ item.area }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: this.$store.getters['Flats/roomsList']
    }
  },
  methods: {
    turnToLeadingZero(number) {
      return number > 9 ? number : '0'.concat(number)
    }
  }
}
</script>
<style lang="scss">
.list-slider {
  &__list {
    display: flex;
    flex-direction: column;
    padding: 30px 45px 40px 40px;
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
