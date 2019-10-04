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
    <model-view :navigation-data="navigation">
      <div class="app">
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
import CostIcon from '@/components/icons/Cost'
import FloorIcon from '@/components/icons/Floor'
import Registration from '@/components/icons/Registration'
import CompassIcon from '@/components/icons/Compass'
import QuestionsIcon from '@/components/icons/Questions'
import PopoverImage from '@/components/partials/PopoverImage'
import MainIcon from '@/components/icons/Main'
export default {
  components: {
    SidebarWithItems,
    ModelView,
    BlockIcon,
    PopoverImage,
    MainIcon,
    QuestionsIcon,
    Registration,
    CostIcon,
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
  data() {
    return {
      navigation: [
        {
          icon: 'block',
          route: `/model/filter`,
          title: 'navigation.block',
          component: BlockIcon
        },
        {
          icon: 'cost',
          route: `/model/filter/price`,
          title: 'navigation.price',
          component: CostIcon
        },
        {
          icon: 'floor',
          route: `/model/filter/floor`,
          title: 'navigation.floor',
          component: FloorIcon
        },
        {
          icon: 'compass',
          route: `/model/filter/views`,
          title: 'navigation.view',
          component: CompassIcon
        }
      ]
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
    height: 580px;
    background: $bg-color-2;
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
