<template>
  <div class="flat-list-table">
    <div class="flat-list-table__header">
      <div class="flat-list-table__header__title">{{$t('labels.floor')}}</div>
      <div class="flat-list-table__header__title">{{$t('labels.number')}}</div>
      <div class="flat-list-table__header__title">{{$t('labels.status')}}</div>
      <div class="flat-list-table__header__title">{{$t('labels.view')}}</div>
      <div class="flat-list-table__header__title">{{$t('labels.area')}}</div>
      <div class="flat-list-table__header__title">{{$t('labels.price')}}</div>
      <div class="flat-list-table__header__title">
        <custom-button :label="$t('labels.LitUpAll')" />
      </div>
    </div>
    <div class="flat-list-table__body">
      <div v-for="(item, index) in list" :key="index" class="flat-list-table__body__item">
        <flat-list-item :item="item"/>
      </div>
    </div>
  </div>
</template>

<script>
import FlatListItem from '@/components/partials/FlatListItem'
import CustomButton from '@/components/partials/CustomButton'
export default {
  components: { FlatListItem, CustomButton },
  props: {
    list: {
      type: Array,
      default: []
    }
  }
}
</script>

<style lang="scss" scoped>
.flat-list-table {
  display: flex;
  flex-direction: column;
  background: #f6ece1;
  border-top-left-radius: 26px; 
  &__header {
    display: flex;
    padding-left: 50px;
    padding-right: 58px;
    height: 92px;
    align-items: center;
    font-size: 12px;
    font-family: $font-caps;
    color: #7e73ae;
    justify-content: space-between;
  }
  &__body {
    &__item {
      border-top: 1px solid #faf4ed;
      padding: 13px 72px 13px 47px;
    }
  }
}
</style>