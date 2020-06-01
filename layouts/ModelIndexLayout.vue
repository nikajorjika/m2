<template>
  <div class="model-index-app-layout">
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
      <div class="model-landing">
        <nuxt />
      </div>
    </model-view>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import SidebarWithItems from '@/components/core/SidebarWithItems'
import ModelView from '@/components/core/ModelView'
import QuestionsIcon from '@/components/icons/Questions'
import Registration from '@/components/icons/Registration'
import PopoverImage from '@/components/partials/PopoverImage'
import MainIcon from '@/components/icons/Main'
export default {
  components: { SidebarWithItems, ModelView, PopoverImage },
  computed: {
    ...mapGetters(['locale']),
    items() {
      return [
        {
          title: {
            en: 'Main',
            ka: 'მთავარი'
          },
          path: `/${this.locale}/model/`,
          component: MainIcon
        },
        {
          title: {
            en: 'REGISTER',
            ka: 'რეგისტრაცია'
          },
          path: `/${this.locale}/sales/registration`,
          component: Registration
        }
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
  .model-index-app-layout {
    height: 100%;
    display: flex;
    background: $bg-color-1;
    .model-landing {
      flex: 1;
    }
  }
  .model-landing {
    background: $bg-color-2;
    box-shadow: 0px 7px 34.56px 1.44px rgba(242, 101, 41, 0.16);
    border-top-left-radius: 48px;
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
