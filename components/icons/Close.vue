<template>
  <close-icon class="icon" :fill="iconColor" :width="width" :height="height" />
</template>
<script>
import CloseIcon from '@/assets/icons/Close1.svg'

export default {
  components: { CloseIcon },
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
    },
    isActive: {
      type: Boolean,
      default: false
    }
  }
}
</script>
