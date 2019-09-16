<template>
  <div class="flat-view">
    <language-switcher class="flat-view__switcher" />
    <flat-navigation class="flat-view__navigation" :nav-data="navigationData" />
    <slot />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FlatNavigation from './FlatNavigation'
import LanguageSwitcher from '@/components/core/LanguageSwitcher'
export default {
  components: {
    FlatNavigation,
    LanguageSwitcher
  },
  props: {
    navigationData: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapGetters({ locale: 'locale' })
  },
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
  max-width: 90%;
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  
  &__switcher {
    margin-right: 67px;
  }
  .faq-container {
    margin: auto 0;
  }
}
</style>
