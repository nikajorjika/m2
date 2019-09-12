<template>
  <phone-icon :width="width" :height="height" :fill="iconColor"></phone-icon>
</template>

<script>
import PhoneIcon from '~/assets/icons/Autorisation_Icon1.svg'

export default {
  components: { PhoneIcon },
  props: {
    width: {
      type: [Number, String],
      default: 18
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
