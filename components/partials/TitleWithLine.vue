<template>
  <h2 class="bordered-title">
    <span class="text" v-html="title" />
  </h2>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Title'
    }
  }
}
</script>
<style lang="scss" scoped>
.bordered-title {
  color: #494949;
  position: relative;
  display: inline-block;
  font-family: $font-caps;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  .text {
    position: relative;
    z-index: 1;
    font-size: 16px;
    line-height: 19px;
    box-shadow: inset 0px -8px 0px 0px #f2cab1;
  }
  .color-orange {
    color: #f26529;
    margin-top: 12px;
  }
}
</style>
