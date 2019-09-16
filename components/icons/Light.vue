<template>
  <svg-icon
    :stroke="`${iconColor}`"
    :width="width"
    :height="height"
    fill="none"
    stroke-miterlimit="10"
    stroke-width="1.5px"
  />
</template>
<script>
import SvgIcon from '@/assets/icons/Light.svg'
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
      default: '#000'
    }
  }
}
</script>
