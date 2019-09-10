<template>
  <div class="render">
    <img src="@/static/images/render.png" alt="Render">
    <block-hover-info class="block-hover-info" />
  </div>
</template>

<script>
import BlockHoverInfo from '@/components/partials/BlockHoverInfo'
export default {
  components: { BlockHoverInfo }
}
</script>

<style lang="scss" scoped>
.render {
  width: 100%;
  height: 100%;
  position: relative;
  .block-hover-info {
    position: absolute;
    top: 10px;
    left: 10px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>