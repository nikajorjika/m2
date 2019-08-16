<template>
  <button class="button">
    <slot />
  </button>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.button {
  font-family: $font-caps;
  font-size: 11px;
  color: #ffffff;
  width: 130px;
  height: 30px;
  border-radius: 8px;
  background-image: linear-gradient(269deg, #e16379 0%, #674f77 100%);
  opacity: 0.7;
  outline: none;
  border: none;
}
</style>
