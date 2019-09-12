<template>
  <img
    src="@/assets/illustrations/illustration-authorisation.png"
    :style="customStyles"
  />
</template>

<script>
export default {
  props: {
    width: {
      type: [String],
      default: '83px'
    },
    height: {
      type: [String],
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
