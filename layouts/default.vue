<template>
  <div class="default-app-layout">
    <svg width="0" height="0">
      <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#e26479" />
        <stop offset="100%" stop-color="#684f78" />
      </linearGradient>
    </svg>
    <sidebar />
    <flat-view>
      <div class="app">
        <nuxt />
      </div>
    </flat-view>
  </div>
</template>
<script>
import Sidebar from '../components/core/Sidebar'
import FlatView from '../components/core/FlatView'
export default {
  components: { Sidebar, FlatView },
  mounted() {
    if (!this.$store.getters['settings/tabletType'].length) {
    }
  }
}
</script>

<style lang="scss">
body {
  background: #fff;
  .default-app-layout {
    min-height: 100vh;
    background: $bg-color-1;
    display: flex;
  }
  .app {
    height: calc(100% - 273px);
    background: $bg-color-2;
    box-shadow: 0px 7px 34.56px 1.44px rgba(242, 101, 41, 0.16);
  }
}
</style>
