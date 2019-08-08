<template>
  <div class="flat-view">
    <flat-navigation />
    <slot />
    <faq-button />
  </div>
</template>

<script>
import FlatNavigation from './FlatNavigation'
import FaqButton from './FAQButton'
export default {
  components: { FlatNavigation, FaqButton }
}
</script>

<style lang="scss" scoped>
.flat-view {
  flex: 1;
}
</style>
