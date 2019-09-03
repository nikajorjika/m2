<template>
  <div class="gradient-block">
    <slot />
  </div>
</template>
<style lang="scss" scoped>
.gradient-block {
  background: linear-gradient(60deg, #684f78 0%, #e26479 100%);
  opacity: 0.7;
  border-radius: 14px;
  overflow: hidden;
  padding: 14px;
  color: #fff;
}
</style>