<template>
  <div class="flat-view">
    <language-switcher class="flat-view__switcher" />
    <flat-navigation class="flat-view__navigation" :nav-data="navData" />
    <slot />
    <div class="faq-container">
      <faq-button @click="goToFaq" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FlatNavigation from './FlatNavigation'
import FlatIcon from '@/components/icons/Appartament'
import RenovationIcon from '@/components/icons/Makeover'
import FurnitureIcon from '@/components/icons/Furniture'
import SupplyIcon from '@/components/icons/Technic'
import DecorationIcon from '@/components/icons/Decor'
import FaqButton from './FAQButton'
import LanguageSwitcher from '@/components/core/LanguageSwitcher'
export default {
  components: {
    FlatNavigation,
    FaqButton,
    LanguageSwitcher,
    FlatIcon,
    RenovationIcon,
    FurnitureIcon,
    SupplyIcon,
    DecorationIcon
  },
  computed: {
    ...mapGetters(['locale']),
    navData() {
      return [
        {
          icon: 'appartament',
          route: `/renovations`,
          title: 'navigation.flat',
          component: FlatIcon
        },
        {
          icon: 'makeover',
          route: `/renovations/makeover`,
          title: 'navigation.renovation',
          component: RenovationIcon
        },
        {
          icon: 'furniture',
          route: `/renovations/furniture`,
          title: 'navigation.furniture',
          component: FurnitureIcon
        },
        {
          icon: 'decor',
          route: `/renovations/decoration`,
          title: 'navigation.decoration',
          component: DecorationIcon
        },
        {
          icon: 'technick',
          route: `/renovations/appliance`,
          title: 'navigation.appliance',
          component: SupplyIcon
        }
      ]
    }
  },
  methods: {
    goToFaq() {
      this.$router.push({ path: `/${this.locale}/renovations/faq` })
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
