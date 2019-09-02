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
import BlockIcon from '@/components/icons/Block'
import CostIcon from '@/components/icons/Cost'
import FloorIcon from '@/components/icons/Floor'
import CompassIcon from '@/components/icons/Compass'
import FaqButton from './FAQButton'
import LanguageSwitcher from '@/components/core/LanguageSwitcher'
export default {
  components: {
    FlatNavigation,
    FaqButton,
    LanguageSwitcher,
    BlockIcon,
    CostIcon,
    FloorIcon,
    CompassIcon
  },
  computed: {
    ...mapGetters(['locale']),
    navData() {
      return [
        {
          icon: 'block',
          route: `/${this.locale}/model`,
          title: 'navigation.block',
          component: BlockIcon
        },
        {
          icon: 'cost',
          route: `/${this.locale}/model/price`,
          title: 'navigation.price',
          component: CostIcon
        },
        {
          icon: 'floor',
          route: `/${this.locale}/model/floor`,
          title: 'navigation.floor',
          component: FloorIcon
        },
        {
          icon: 'compass',
          route: `/${this.locale}/model/views`,
          title: 'navigation.views',
          component: CompassIcon
        }
      ]
    }
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
