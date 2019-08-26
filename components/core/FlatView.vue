<template>
  <div class="flat-view">
    <language-switcher class="flat-view__switcher" />
    <flat-navigation class="flat-view__navigation" />
    <slot />
    <div class="faq-container">
      <faq-button @click="goToFaq" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FlatNavigation from './FlatNavigation'
import FaqButton from './FAQButton'
import LanguageSwitcher from '@/components/core/LanguageSwitcher'
export default {
  components: { FlatNavigation, FaqButton, LanguageSwitcher },
  computed: mapGetters(['locale']),
  methods: {
    goToFaq() {
      this.$router.push({ path: `/${this.locale}/faq` })
    }
  }
}
</script>

<style lang="scss" scoped>
.flat-view {
  flex: 1;
  display: flex;
  flex-direction: column;
  &__switcher {
    margin-right: 67px;
  }
  .faq-container {
    margin: auto 0;
  }
}
</style>
