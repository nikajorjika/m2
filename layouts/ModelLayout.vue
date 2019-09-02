<template>
  <div class="default-app-layout">
    <div
      class="maximize__popover"
      :class="{ open: $store.getters.overlay.open }"
      @click="handleClose"
    >
      <img
        :src="$store.getters.overlay.image"
        alt="Maximized Image"
        @click.stop
      />
    </div>
    <svg width="0" height="0">
      <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#e26479" />
        <stop offset="100%" stop-color="#684f78" />
      </linearGradient>
    </svg>
    <sidebar />
    <model-view>
      <div class="app">
        <nuxt />
      </div>
    </model-view>
  </div>
</template>
<script>
import Sidebar from '@/components/core/Sidebar'
import ModelView from '@/components/core/ModelView'
export default {
  components: { Sidebar, ModelView },
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
  methods: {
    handleClose() {
      this.$store.commit('setOverlay', { image: '', open: false })
    }
  }
}
</script>

<style lang="scss">
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
    height: calc(100% - 221px);
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
