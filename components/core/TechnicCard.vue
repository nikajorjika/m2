<template>
  <div class="card">
    <div class="card__image">
      <img src="https://dummyimage.com/420x300/ffffff/000" />
    </div>
    <div class="card__content">
      <div class="card__title card__title--red">მაცივარი</div>
      <div class="card__text">
        შემთხვევითად გენერირებული ტექსტი ეხმარება დიზაინერებს და ტიპოგრაფიული
        ნაწარმის შემქმნელებს, რეალურთან მაქსიმალურად
      </div>
      <div class="card__button">
        <GradientButton>ტექნიკის ფერი: ლურჯი</GradientButton>
      </div>
    </div>
  </div>
</template>

<script>
import GradientButton from '@/components/core/GradientButton'
export default {
  components: {
    GradientButton
  }
}
</script>

<style lang="scss" scoped>
.card {
  border-radius: 30px 0;
  overflow: hidden;
  &__image {
    img {
      display: block;
      max-width: 100%;
    }
  }
  &__content {
    padding: 25px 35px;
    background: #f9f1e9;
  }

  &__title {
    font-family: $font-caps;
    font-size: 18px;
    margin-bottom: 25px;
    &--red {
      color: #f49b73;
    }
  }
  &__text {
    font-family: $font;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 25px;
  }
}
</style>
