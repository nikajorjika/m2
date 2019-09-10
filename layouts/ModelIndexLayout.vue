<template>
  <div class="model-index-app-layout">
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
import SidebarWithItems from '@/components/core/SidebarWithItems'
import ModelView from '@/components/core/ModelView'
import QuestionsIcon from '@/components/icons/Questions'
import MainIcon from '@/components/icons/Main'
import { mapGetters } from 'vuex';
export default {
  components: { SidebarWithItems, ModelView, MainIcon },
  computed: {
    ...mapGetters(['locale']),
    items() {
      return [
        {
          title: {
            en: 'MAIN',
            ka: 'მთავარი'
          },
          path: `/${this.locale}/model/`,
          component: MainIcon
        },
        {
          title: {
            en: 'QUESTIONS',
            ka: 'კითხვები'
          },
          path: `/${this.locale}/model/filter`,
          component: QuestionsIcon
        }
      ]
    }
  }
}
</script>

<style lang="scss">
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
