<template>
  <arrow-icon :fill="iconColor" :width="width" :height="height" />
</template>
<script>
import ArrowIcon from '@/assets/icons/arrow-pointing-to-right.svg'
export default {
  name: 'RightArrowIcon',
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
