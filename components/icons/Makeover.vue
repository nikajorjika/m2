<template>
  <icon-component
    fill="none"
    :stroke="iconColor"
    :width="width"
    :height="height"
  />
</template>
<script>
import IconComponent from '@/assets/icons/makeover1.svg'
export default {
  components: { IconComponent },
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
