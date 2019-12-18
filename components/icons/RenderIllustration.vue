<template>
  <svg-icon :style="customStyles" />
</template>

<script>
import SvgIcon from '@/assets/illustrations/illustration-render.svg'

export default {
  components: { SvgIcon },
  props: {
    width: {
      type: String,
      default: '80px'
    },
    height: {
      type: String,
      default: '70px'
    },
    margin: {
      type: String,
      default: 'initial'
    }
  },
  computed: {
    customStyles() {
      return {
        width: this.width,
        height: this.height,
        margin: this.margin
      }
    }
  }
}
</script>
