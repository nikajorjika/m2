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
  font-size: 24px;
  display: inline-block;
  font-family: $font-caps;
  font-weight: 500;
  letter-spacing: 0.6px;
  .text {
    position: relative;
    z-index: 1;
  }
  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 0;
    background: #f2cab1;
    height: 10px;
    width: 100%;
  }
}
</style>
