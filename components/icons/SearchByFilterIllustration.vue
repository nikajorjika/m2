<template>
  <img
    src="@/assets/illustrations/illustration-filter.png"
    :style="customStyles"
  />
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: '80px'
    },
    height: {
      type: String,
      default: '70px'
    },
    margin: {
      type: String,
      default: 'initial'
    }
  },
  computed: {
    customStyles() {
      return {
        width: this.width,
        height: this.height,
        margin: this.margin
      }
    }
  }
}
</script>
