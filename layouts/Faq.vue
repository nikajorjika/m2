<template>
  <client-only>
    <div class="default-faq-layout">
      <svg width="0" height="0">
        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#e26479" />
          <stop offset="100%" stop-color="#684f78" />
        </linearGradient>
      </svg>
      <svg width="0" height="0">
        <linearGradient id="gradient-reverse" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#684f78" />
          <stop offset="100%" stop-color="#e26479" />
        </linearGradient>
      </svg>
      <component :is="sidebarComponent" :homepage="homepage" />
      <faq-view>
        <div class="faq">
          <div class="faq__header">
            <div class="faq__header__icon">
              <question-icon
                icon-color="url(#gradient-reverse)"
                width="10"
                height="9"
              />
            </div>
            <div class="faq__header__title">
              <title-with-line :title="$t('titles.FrequentlyAskedQuestions')" />
            </div>
          </div>
          <nuxt />
        </div>
      </faq-view>
    </div>
  </client-only>
</template>
<script>
import { mapGetters } from 'vuex'
import Sidebar from '@/components/core/Sidebar'
import FaqView from '@/components/core/FaqView'
import TitleWithLine from '@/components/partials/TitleWithLine'
import QuestionIcon from '@/components/icons/Questions'
import SalesAppSidebar from '@/components/core/SalesAppSidebar'

export default {
  components: { FaqView, QuestionIcon, TitleWithLine },
  layout: 'Faq',
  data() {
    return {
      appName: this.$cookies.get('paveleon-app')
    }
  },
  computed: {
    ...mapGetters(['locale']),
    homepage() {
      return `/${this.locale}/${this.appName}`
    },
    sidebarComponent() {
      return this.appName === 'sales' ? SalesAppSidebar : Sidebar
    }
  }
}
</script>

<style lang="scss" scoped>
body {
  background: #fff;
  .default-faq-layout {
    min-height: 100vh;
    background: $bg-color-1;
    display: flex;
  }
  .faq {
    height: calc(100% - 156px);
    width: 1150px;
    background: $bg-color-2;
    box-shadow: 0px 7px 34.56px 1.44px rgba(242, 101, 41, 0.16);
    padding: 18.09px 368px 28px 117px;
    margin-left: auto;
    &__header {
      display: flex;
      align-items: center;
      &__icon {
        margin-right: 29px;
        padding: 12px 21px;
        height: 9px;
        display: flex;
        box-sizing: content-box;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 15px;
      }
    }
  }
}
</style>
