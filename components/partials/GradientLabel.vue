<template>
  <div class="gradient-label">
    <span>{{ text }}</span>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss">
.gradient-label {
  color: #ffffff;
  position: relative;
  display: inline-block;
  font-family: $font;
  font-size: 14px;
  padding: 10px 23px;
  background: #f2a47e;
  border-radius: 20px;
  overflow: hidden;
  letter-spacing: 0.8px;
  span {
    position: relative;
    z-index: 1;
  }
  &:before {
    content: '';
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0.7;
    z-index: 0;
    position: absolute;
    background: linear-gradient(
      to right,
      rgba(104, 79, 120, 1) 0%,
      rgba(226, 100, 121, 1) 100%
    );
  }
}
</style>
