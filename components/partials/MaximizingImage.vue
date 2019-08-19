<template>
  <div class="maximize">
    <div class="maximize__icon" :style="{ width: width, height: height }" @click="handleClick">
      <zoom-icon
        :height="iconHeight"
        :width="iconWidth"
        :iconColor="iconColor"
        :isActive="isActive"
        :fill-opacity="opacity"
      />
    </div>
    <div class="maximize__popover" :class="{open: open}" @click="handleClose">
      <img :src="image" alt="Maximized Image">
    </div>
  </div>
</template>
<script>
import ZoomIcon from '@/components/icons/Zoom'
export default {
  components: { ZoomIcon },
  props: {
    image: {
      type: String,
      required: true
    },
    bgColor: {
      type: String,
      default: '#fff'
    },
    width: {
      type: String,
      default: 18
    },
    height: {
      type: String,
      default: 18
    },
    iconWidth: {
      type: [Number, String],
      default: 18
    },
    iconHeight: {
      type: [Number, String],
      default: 18
    },
    iconColor: {
      type: String,
      default: '#fff'
    },
    opacity: {
      type: String,
      default: '0.5'
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      open: false
    }
  },
  methods: {
    handleClick: function() {
      this.open = !this.open
    },
    handleClose: function() {
      this.open = false
    }
  }
}
</script>
<style lang="scss" scoped>
.maximize {
  display: inline-block;
  &__icon {
    display: flex;
    align-items: center;
    background: #f26529;
    justify-content: center;
    border-radius: 50%;
  }
  &__popover {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    background: rgba(0,0,0,0.3);
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
@keyframes scaleUp {
  0% {
    transform: scale(0.3);
  }
  100% {
    transform: scale(1);
  }
}
</style>
