<template>
  <div class="maximize">
    <div
      class="maximize__icon"
      :style="{ width, height, backgroundColor: bgColor }"
      @click="handleClick"
    >
      <zoom-icon
        :height="iconHeight"
        :width="iconWidth"
        :icon-color="iconColor"
        :is-active="isActive"
        :fill-opacity="opacity"
      />
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
      default: '',
      required: false
    },
    bgColor: {
      type: String,
      default: '#f26529'
    },
    width: {
      type: String,
      default: '18'
    },
    height: {
      type: String,
      default: '18'
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
    handleClick() {
      this.updateOverlay(this.image, true)
    },

    updateOverlay(image, open) {
      const overlay = { image, open }
      this.$store.commit('setOverlay', overlay)
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
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
  }
}
</style>
