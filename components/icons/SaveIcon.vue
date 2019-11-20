<template>
  <Icon :width="width" :height="height" :stroke="color"></Icon>
</template>

<script>
import Icon from '@/assets/icons/Favourite1.svg'

export default {
  components: { Icon },
  props: {
    width: {
      type: [Number, String],
      default: 24
    },
    height: {
      type: [Number, String],
      default: 24
    },
    color: {
      type: [String],
      default: '#fff'
    }
  }
}
</script>
