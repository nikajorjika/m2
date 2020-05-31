<template>
  <div class="default-app-layout">
    <popover-image
      :open="$store.getters.overlay.open"
      :image="$store.getters.overlay.image"
      @close="handleClose"
    />

    <svg width="0" height="0">
      <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#e26479" />
        <stop offset="100%" stop-color="#684f78" />
      </linearGradient>
    </svg>

    <sales-app-sidebar />

    <sale-filter-view>
      <div class="app">
        <nuxt />
      </div>
    </sale-filter-view>

    <modal />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import SaleFilterView from '@/components/core/SaleFilterView'
import SalesAppSidebar from '@/components/core/SalesAppSidebar'
import PopoverImage from '@/components/partials/PopoverImage'
import QuestionsIcon from '@/components/icons/Questions'
import MainIcon from '@/components/icons/Main'
import Modal from '@/components/partials/Modal'

export default {
  components: {
    SalesAppSidebar,
    SaleFilterView,
    PopoverImage,
    Modal
  },
  props: {
    image: {
      type: String,
      default: ''
    },
    open: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(['locale']),
    items() {
      return [
        {
          title: {
            en: 'Main',
            ka: 'მთავარი'
          },
          path: `/${this.locale}/sales`,
          component: MainIcon
        },
        // {
        //   title: {
        //     en: 'FAQ',
        //     ka: 'კითხვები'
        //   },
        //   path: `/${this.locale}/model/faq?redirect=${this.$route.name}`,
        //   component: QuestionsIcon
        // }
      ]
    }
  },
  methods: {
    handleClose() {
      this.$store.commit('setOverlay', { image: '', open: false })
    }
  }
}
</script>

<style lang="scss" scoped>
body {
  background: #fff;

  .default-app-layout {
    min-height: 100vh;
    background: $bg-color-1;
    display: flex;

    .maximize__popover {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
      background: rgba(0, 0, 0, 0.3);
      justify-content: center;
      align-items: center;
      z-index: 999;

      img {
        max-width: 70%;
        max-height: 80%;
      }

      &.open {
        display: flex;
        animation: scaleUp 0.2s;
      }
    }
  }

  .app {
    // height: 100%;
    height: calc(100% - 138px);
    background: transparent;
    box-shadow: initial;
  }

  @keyframes scaleUp {
    0% {
      transform: scale(0.3);
    }
    100% {
      transform: scale(1);
    }
  }
}
</style>
