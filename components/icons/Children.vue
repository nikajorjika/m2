<template>
  <arrow-icon :fill="iconColor" :width="width" :height="height" />
</template>
<script>
import ArrowIcon from '@/assets/icons/Children1.svg'
export default {
  components: { ArrowIcon },
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
      default: '#000'
    }
  }
}
</script>
