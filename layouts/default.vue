<template>
  <div class="default-app-layout">
    <sidebar />
    <flat-view>
      <nuxt />
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
    height: 100vh;
    background: $bg-color-1;
    display: flex;
  }
}
</style>
