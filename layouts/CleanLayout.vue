<template>
  <div class="clean-app-layout">
    <div class="app">
      <svg class="gradient-svg" width="0" height="0">
        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#e26479" />
          <stop offset="100%" stop-color="#684f78" />
        </linearGradient>
      </svg>
      <nuxt />
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
.gradient-svg {
  position: absolute;
}
</style>