<template>
  <div class="card">
    <div class="card__image" :style="{ backgroundImage: 'url(' + item.image.url + ')' }"></div>
    <div class="card__content">
      <div class="card__title card__title--red">{{ item.name }}</div>
      <div class="card__text">{{ item.description }}</div>
      <div class="card__button">
        <GradientButton>ტექნიკის ფასი: {{ item.price }}</GradientButton>
      </div>
    </div>
  </div>
</template>

<script>
import GradientButton from '@/components/core/GradientButton'
export default {
  components: {
    GradientButton
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  border-radius: 30px 0;
  overflow: hidden;
  &__image {
    width: 100%;
    padding-top: 72%;
    background-size: cover;
  }
  &__content {
    padding: 20px 25px;
    background: #f9f1e9;
  }

  &__title {
    font-family: $font-caps;
    font-size: 18px;
    margin-bottom: 15px;
    height: 36px;
    overflow: hidden;
    &--red {
      color: #f49b73;
    }
  }
  &__text {
    font-family: $font;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 15px;
    color: #595959;
    height: 100px;
    overflow: hidden;
  }
}
</style>
