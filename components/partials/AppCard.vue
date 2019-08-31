<template>
  <div class="app-card" @click="$emit('click')">
    <div class="app-card__title">{{ title }}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.app-card {
  background: #fff;
  box-shadow: 3px 3px #d9d9dd;
  display: inline-block;
  padding: 30px 50px;
}
</style>