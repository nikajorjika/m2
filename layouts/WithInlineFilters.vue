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
    <model-view>
      <template v-slot:sessionStatus>
        <session-button class="sales-session-button" />
      </template>
      <div class="app">
        <inline-filter-navigation />
        <nuxt />
      </div>
    </model-view>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import SalesAppSidebar from '@/components/core/SalesAppSidebar'
import ModelView from '@/components/core/ModelView'
import InlineFilterNavigation from '@/components/core/InlineFilterNavigation'
import BlockIcon from '@/components/icons/Block'
import CostIcon from '@/components/icons/Cost'
import FloorIcon from '@/components/icons/Floor'
import CompassIcon from '@/components/icons/Compass'
import QuestionsIcon from '@/components/icons/Questions'
import Registration from '@/components/icons/Registration'
import ToFind from '@/components/icons/ToFind'
import StatusIcon from '@/components/icons/Status'
import SleepingRoom from '@/components/icons/SleepingRoom'
import ProjectIcon from '@/components/icons/Project'
import PopoverImage from '@/components/partials/PopoverImage'
import MainIcon from '@/components/icons/Main'
import SessionButton from '@/components/partials/SessionButton'
export default {
  components: {
    SalesAppSidebar,
    ModelView,
    InlineFilterNavigation,
    BlockIcon,
    PopoverImage,
    MainIcon,
    QuestionsIcon,
    CostIcon,
    Registration,
    SessionButton,
    FloorIcon,
    CompassIcon
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
    ...mapGetters({ locale: 'locale' }),
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
        {
          title: {
            en: 'FAQ',
            ka: 'კითხვები'
          },
          path: `/${this.locale}/model/faq`,
          component: QuestionsIcon
        }
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
  .gradient-line {
    height: 6px;
    background: linear-gradient(45deg, #f26529 0%, #f6a646 100%);
  }
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
    height: 100%;
    background: $bg-color-2;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    box-shadow: 0px 7px 34.56px 1.44px rgba(242, 101, 41, 0.16);
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
