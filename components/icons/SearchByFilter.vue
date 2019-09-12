<template>
  <filter-icon :width="width" :height="height" :fill="iconColor"></filter-icon>
</template>

<script>
import FilterIcon from '~/assets/icons/Filter_Search1svg'

export default {
  components: { FilterIcon },
  props: {
    width: {
      type: [Number, String],
      default: 16
    },
    height: {
      type: [Number, String],
      default: 14
    },
    iconColor: {
      type: String,
      default: '#fff'
    }
  }
}
</script>
