<template>
  <div class="flat-view">
    <div class="flat-view__top-block">
      <div class="flat-view__back-button" @click="handleBack"> 
        <span class="flat-view__back-button__icon">
          <caret-right width="10" height="12" icon-color="#432272" />
          <caret-right width="10" height="12" icon-color="#432272" />
        </span>
        <span>{{$t('labels.back')}}</span>
      </div>
      <language-switcher class="flat-view__switcher" />
    </div>
    <flat-navigation class="flat-view__navigation" :nav-data="navigationData" />
    <slot />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FlatNavigation from './FlatNavigation'
import LanguageSwitcher from '@/components/core/LanguageSwitcher'
import CaretRight from '@/components/icons/CaretRight'
export default {
  components: {
    FlatNavigation,
    CaretRight,
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
    },
    handleBack() {
      this.$router.go(-1)
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
  &__back-button {
    color: #3c2270;
    font-family: $font;
    font-size: 10px; 
  }
  &__top-block {
    display:flex;
    justify-content: space-between;
    align-items: center;
  }
  &__switcher {
    margin-right: 67px;
  }
  .faq-container {
    margin: auto 0;
  }
  &__back-button {
    display: flex;
    &__icon {
      svg {
        transform: rotate(180deg);
        &:last-child {
          margin-left: -9px;
        }
      }  
    }
  }
}
</style>
