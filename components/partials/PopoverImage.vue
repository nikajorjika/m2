<template>
  <div
    class="maximize__popover"
    :class="{ open: $store.getters.overlay.open }"
    @click="handleClose"
  >
    <div class="image-container" @click.stop>
      <button class="close-button" @click="handleClose">
        <close-icon icon-color="#fff" :width="11" :height="11" />
      </button>
      <img
        :src="$store.getters.overlay.image"
        alt="Maximized Image"
      />
    </div>
  </div>
</template>

<script>
import CloseIcon from '@/components/icons/Close'
export default {
  components: {CloseIcon},
  props: {
    open: {
      type: Boolean,
      default: false
    },
    image: {
      type: String,
      default: null
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>

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
.image-container {
  padding: 68px 68px;
  position: relative;
  display: flex;
  background: #fff;
  img {
    margin: auto;
  }
}
.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  border-radius: 50%;
  width: 47px;
  height: 47px;
  background-color: #f26529;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: none;
  color: white;
  cursor: pointer;
}
</style>