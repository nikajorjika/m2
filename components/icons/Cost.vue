<template>
  <arrow-icon 
    :stroke="`${iconColor}`" 
    :width="width" 
    :height="height" 
    fill='none'
    stroke-miterlimit='10' 
    stroke-width='1.5px'
  />
</template>
<script>
import ArrowIcon from '@/assets/icons/Cost1.svg'
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
