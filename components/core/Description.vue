<template>
  <div class="description">
    <div class="description__title">
      <span>{{ firstTitle }}</span>
      <span class="description__title--red">{{ lastTitle }}</span>
    </div>
    <div class="description__text">{{ text }}</div>
  </div>
</template>

<style lang="scss" scoped>
.description {
  max-width: 400px;
  &__title {
    display: inline;
    font-size: 20px;
    font-family: $font-caps;
    line-height: 27px;
    letter-spacing: 1px;
    font-weight: 800;
    box-shadow: inset 0px -8px 0px 0px #f2cab1;
    color: #494949;
    &--red {
      color: #f26529;
    }
  }

  &__text {
    font-size: 15px;
    font-family: $font;
    letter-spacing: 0.6px;
    line-height: 18px;
    margin-top: 40px;
    color: #494949;
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
  },
  computed: {
    // a computed getter
    firstTitle() {
      let str = this.title
      const lastIndex = str.lastIndexOf(' ')
      str = str.substring(0, lastIndex)
      return str
    },
    lastTitle() {
      const n = this.title.split(' ')
      return n[n.length - 1]
    }
  }
}
</script>
