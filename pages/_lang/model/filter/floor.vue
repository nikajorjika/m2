<template>
  <div class="filter-floor">
    <div class="filter-floor__title">
      <div class="filter-floor__title__wrapper">
        <title-with-line :title="$t('labels.what_floor_are_you_looking_for')" />
      </div>
      <small>{{$t('labels.pick_multiple')}}</small>
    </div>
    <div class="filter-floor__range-selector">
      <range-picker :ranges="ranges" />
    </div>
    <filters-footer-block />
  </div>
</template>

<script>
import TitleWithLine from '@/components/partials/TitleWithLine'
import RangePicker from '@/components/partials/RangePicker'
import FiltersFooterBlock from '@/components/partials/FiltersFooterBlock'
export default {
  components: { TitleWithLine, RangePicker, FiltersFooterBlock },
  layout: 'ModelFilterLayout',
  data() {
    return {
      ranges: [
        '1 - 5',
        '5 - 10',
        '10 - 15',
        '15 - 20',
        '20 - 25',
        '25+',
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-floor {
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
      width: 63%;
  }
}
</style>