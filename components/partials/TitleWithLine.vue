<template>
  <h2 class="bordered-title">
    <span class="text">{{ title }}</span>
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
<style lang="scss">
.bordered-title {
  color: #494949;
  position: relative;
  font-size: 16px;
  display: inline-block;
  font-family: $font-caps;
  font-weight: 500;
  letter-spacing: 0.6px;
  .text {
    position: relative;
    z-index: 1;
    box-shadow: inset 0px -8px 0px 0px #f2cab1;
  }
}
</style>
