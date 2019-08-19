<template>
  <div class="flat-view">
    <flat-navigation />
    <slot />
    <div class="faq-container">
      <faq-button @click="goToFaq" />
    </div>
  </div>
</template>

<script>
import FlatNavigation from './FlatNavigation'
import FaqButton from './FAQButton'
export default {
  components: { FlatNavigation, FaqButton },
  methods: {
    goToFaq: function () {
      this.$router.push({ path: `/${this.$store.state.locale}/faq`})
    }
  }
}
</script>

<style lang="scss" scoped>
.flat-view {
  flex: 1;
  display: flex;
  flex-direction: column;
  .faq-container {
    margin: auto 0;
  }
}
</style>
