<template>
  <svg-icon :stroke="iconColor" :width="width" :height="height" />
</template>
<script>
import SvgIcon from '@/assets/icons/InProgress.svg'
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
    },
    iconColor: {
      type: String,
      default: '#fff'
    }
  }
}
</script>
