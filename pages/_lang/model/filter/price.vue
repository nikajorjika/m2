<template>
  <div class="filter-price">
    <div class="filter-price__title">
      <div class="filter-price__title__wrapper">
        <title-with-line :title="$t('labels.for_what_price')" />
      </div>
      <small>{{$t('labels.pick_range')}}</small>
    </div>
    <div class="filter-price__range-selector">
      <select-range class="filter-price__range-selector__component"/>
    </div>
    <filters-footer-block />
  </div>
</template>

<script>
import TitleWithLine from '@/components/partials/TitleWithLine'
import SelectRange from '@/components/partials/SelectRange'
import FiltersFooterBlock from '@/components/partials/FiltersFooterBlock'
export default {
  components: { TitleWithLine, SelectRange, FiltersFooterBlock },
  layout: 'ModelFilterLayout'
}
</script>

<style lang="scss" scoped>
.filter-price {
  padding: 50px 61px;    
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &__title {
    display: flex;
    flex-direction: column;
    small {
      font-family: $font;
      font-size: 12px;
      margin-top: 12px;
      color: #424242;
    }
  }
  &__range-selector {
    &__component {
      width: 63%;
    }
  }
}
</style>