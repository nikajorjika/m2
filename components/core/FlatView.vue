<template>
  <div class="flat-view">
    <flat-navigation />
    <slot />
  </div>
</template>

<script>
import FlatNavigation from './FlatNavigation'
export default {
  components: { FlatNavigation }
}
</script>

<style lang="scss" scoped>
.flat-view {
  flex: 1;
}
</style>
