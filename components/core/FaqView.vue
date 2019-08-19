<template>
  <div class="faq-view">
    <slot />
    <div class="close-container">
      <close-button :button-text="$t('buttons.CLOSE')" @click="goBack"/>
    </div>
  </div>
</template>

<script>
import CloseButton from '@/components/partials/CloseButton'
export default {
  components: { CloseButton },
  methods: {
    goBack: function() {
      this.$router.go(-1)
    }
  }
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
