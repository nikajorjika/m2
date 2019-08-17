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
  padding: 12px 24px;
  opacity: 0.6;
  border-radius: 14px;
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
    z-index: 0;
    position: absolute;
    background: linear-gradient(
      60deg,
      #684f78 0%,
      #e26479 100%
    );
  }
}
</style>
