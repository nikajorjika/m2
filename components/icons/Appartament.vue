<template>
  <arrow-icon
    class="icon"
    :stroke="iconColor"
    :width="width"
    :height="height"
  />
</template>
<script>
import ArrowIcon from '@/assets/icons/Appartament1.svg'

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
    },
    isActive: {
      type: Boolean,
      default: false
    }
  }
}
</script>
