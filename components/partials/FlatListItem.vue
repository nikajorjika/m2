<template>
  <ul class="flat-list-item">
    <li class="flat-list-item__li medium">{{ item.floor }}</li>
    <li class="flat-list-item__li medium">{{ item.flatNumber }}</li>
    <li class="flat-list-item__li large">{{ item.status }}</li>
    <li class="flat-list-item__li large">{{ item.view }}</li>
    <li class="flat-list-item__li medium">{{ item.area }}</li>
    <li class="flat-list-item__li xs">{{ item.price }}</li>
  </ul>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.flat-list-item {
  background: linear-gradient(85deg, #ae9ba8 0%, #eba5a9 100%);
  display: flex;
  list-style: none;
  padding: 0;
  justify-content: space-between;
  align-items: center;
  padding-left: 36px;
  padding-right: 40px;
  height: 46px;
  border-radius: 11px;
  width: 100%;
  &__li {
    color: #fff;
    font-family: $font;
    font-size: 12px;
    &.medium {
      width: 104px;
    }
    &.large {
      width: 136px;
    }
    &.xs {
      width: 86px;
    }
  }
}
</style>
