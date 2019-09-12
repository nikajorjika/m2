<template>
  <flat-icon :width="width" :height="height" :fill="iconColor"></flat-icon>
</template>

<script>
import FlatIcon from '~/assets/icons/Room_Search1.svg'

export default {
  components: { FlatIcon },
  props: {
    width: {
      type: [Number, String],
      default: 16
    },
    height: {
      type: [Number, String],
      default: 16
    },
    iconColor: {
      type: String,
      default: '#fff'
    }
  }
}
</script>
