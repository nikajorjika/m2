<template>
  <ul class="flat-list-item">
    <li class="flat-list-item__li">{{ item.floor }}</li>
    <li class="flat-list-item__li">{{ item.flatNumber }}</li>
    <li class="flat-list-item__li">{{ item.status }}</li>
    <li class="flat-list-item__li">{{ item.view }}</li>
    <li class="flat-list-item__li">{{ item.area }}</li>
    <li class="flat-list-item__li">{{ item.price }}</li>
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
  height: 46px;
  border-radius: 11px;
  &__li {
    color: #fff;
    font-family: $font;
    font-size: 12px;
    padding: 0 46px;
  }
}
</style>
