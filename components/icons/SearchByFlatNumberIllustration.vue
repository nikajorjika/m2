<template>
  <img
    src="@/assets/illustrations/illustration-room.png"
    :style="customStyles"
  />
</template>

<script>
export default {
  props: {
    width: {
      type: [String],
      default: '75px'
    },
    height: {
      type: [String],
      default: '72px'
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
