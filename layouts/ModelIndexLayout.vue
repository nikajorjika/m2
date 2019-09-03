<template>
  <div class="model-index-app-layout">
    <sidebar />
    <model-view>
      <div class="model-landing">
        <nuxt />
      </div>
    </model-view>
  </div>
</template>
<script>
import Sidebar from '@/components/core/Sidebar'
import ModelView from '@/components/core/ModelView'
import { mapGetters, mapActions } from 'vuex';
export default {
  components: { Sidebar, ModelView }
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
