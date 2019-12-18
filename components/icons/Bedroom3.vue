<template>
  <div class="icon">
    <div class="rectangle"></div>
    <div class="rectangle"></div>
    <div class="rectangle"></div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.icon {
  height: 100%;
  margin: auto;
  display: grid;
  grid-template-rows: 10px 10px;
  grid-template-columns: 10px 10px;
  grid-row-gap: 2px;
  grid-column-gap: 2px;
  justify-content: center;
  .rectangle {
    height: 10px;
    width: 10px;
    background: #796b93;
    border-radius: 3px;
  }
}
</style>
