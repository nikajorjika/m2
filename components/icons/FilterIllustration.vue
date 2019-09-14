<template>
  <svg-icon :width="width" :height="height" />
</template>
<script>
import SvgIcon from '@/assets/icons/FilterIllustration.svg'
export default {
  components: { SvgIcon },
  props: {
    width: {
      type: [Number, String],
      default: 18
    },
    height: {
      type: [Number, String],
      default: 18
    }
  }
}
</script>
