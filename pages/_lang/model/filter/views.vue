<template>
  <div class="filter-floor">
    <div class="filter-floor__title">
      <div class="filter-floor__title__wrapper">
        <title-with-line :title="$t('labels.what_floor_are_you_looging_for')" />
      </div>
      <small>{{$t('labels.pick_range')}}</small>
    </div>
    <div class="filter-floor__range-selector">
      <views-picker :views="views" />
    </div>
    <filters-footer-block />
  </div>
</template>

<script>
import TitleWithLine from '@/components/partials/TitleWithLine'
import ViewsPicker from '@/components/partials/ViewsPicker'
import FiltersFooterBlock from '@/components/partials/FiltersFooterBlock'
export default {
  components: { TitleWithLine, ViewsPicker, FiltersFooterBlock },
  layout: 'ModelLayout',
  data() {
    return {
      views: [
        'პირველი ხედი',
        'მეორე ხედით',
        'მესამე ხედით',
        'მეოთხე ხედით'
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
    width: 58%;
  }
}
</style>