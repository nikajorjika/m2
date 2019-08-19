<template>
  <div class="faq-view">
    <slot />
    <div class="close-container">
      <close-button :button-text="$t('buttons.CLOSE')" />
    </div>
  </div>
</template>

<script>
import CloseButton from '@/components/partials/CloseButton'
export default {
  components: { CloseButton }
}
</script>

<style lang="scss" scoped>
.faq-view {
  flex: 1;
  display: flex;
  flex-direction: column;
  .close-container {
    margin: auto 0;
  }
}
</style>
