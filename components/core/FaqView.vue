<template>
  <div class="faq-view">
    <language-switcher class="faq-switcher" />
    <slot />
    <div class="close-container">
      <close-button :button-text="$t('buttons.CLOSE')" @click="goBack" />
    </div>
  </div>
</template>

<script>
import LanguageSwitcher from '@/components/core/LanguageSwitcher'
import CloseButton from '@/components/partials/CloseButton'
export default {
  components: { CloseButton, LanguageSwitcher },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.faq-view {
  flex: 1;
  width: calc(100% - 81px);
  display: flex;
  flex-direction: column;
  .close-container {
    margin: auto 50px;
  }
  .faq-switcher {
    margin-right: 67px;
    height: 63px;
  }
}
</style>
