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
    <sidebar-with-items :items="items" />
    <model-view>
      <div class="app">
        <flat-navigation :nav-data="navigation"/>
        <nuxt />
      </div>
    </model-view>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import SidebarWithItems from '@/components/core/SidebarWithItems'
import ModelView from '@/components/core/ModelView'
import BlockIcon from '@/components/icons/Block'
import FlatNavigation from '@/components/core/FlatNavigation'
import FloorIcon from '@/components/icons/Floor'
import QuestionsIcon from '@/components/icons/Questions'
import Registration from '@/components/icons/Registration'
import ProjectIcon from '@/components/icons/Project'
import CompletedIcon from '@/components/icons/Completed'
import PopoverImage from '@/components/partials/PopoverImage'
import MainIcon from '@/components/icons/Main'
export default {
  components: {
    SidebarWithItems,
    ModelView,
    FlatNavigation,
    BlockIcon,
    PopoverImage,
    MainIcon,
    QuestionsIcon,
    Registration,
    FloorIcon
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
    navigation() {
      return [
        {
          title: 'navigation.block',
          component: BlockIcon,
          route: '/sales/render'
        },
        {
          title: 'navigation.floor',
          component: FloorIcon,
          route: '/sales/render/floor'
        },
        {
          title: 'navigation.floorPlan',
          component: FloorIcon,
          route: '/sales/render/flat'
        }
      ]
    },
    items() {
      return [
        {
          title: {
            en: 'Main',
            ka: 'მთავარი'
          },
          path: `/${this.locale}/model`,
          component: MainIcon
        },
        {
          title: {
            en: 'REGISTER',
            ka: 'რეგისტრაცია'
          },
          path: `/${this.locale}/sales/registration`,
          component: Registration
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
    height: auto;
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
