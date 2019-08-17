<template>
  <div class="description">
    <div class="description__title">
      <span>რეპლიკაციაზე წარმოდგენილი ავეჯი</span>
      <span class="description__title--red">{{ title }}</span>
    </div>
    <div class="description__text">{{ text }}</div>
  </div>
</template>

<style lang="scss" scoped>
.description {
  max-width: 400px;
  &__title {
    font-size: 20px;
    font-family: $font-caps;
    &--red {
      color: red;
    }
  }

  &__text {
    font-size: 15px;
    font-family: $font;
    line-height: 25px;
    margin-top: 40px;
  }
}
</style>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  }
}
</script>
