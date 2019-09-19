<template>
  <svg-icon :width="width" :height="width" :style="{margin}"/>
</template>

<script>
import SvgIcon from '@/assets/icons/FilterByFlatNumberIllustration.svg'
export default {
  components: { SvgIcon },
  props: {
    width: {
      type: [String],
      default: '75px'
    },
    height: {
      type: [String],
      default: '72px'
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
