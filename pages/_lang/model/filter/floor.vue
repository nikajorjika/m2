<template>
  <div class="filter-floor">
    <div class="filter-floor__title">
      <div class="filter-floor__title__wrapper">
        <title-with-line :title="$t('labels.what_floor_are_you_looking_for')" />
      </div>
      <small>{{ $t('labels.pick_multiple') }}</small>
    </div>
    <div class="filter-floor__range-selector">
      <select-range
        class="filter-price__range-selector__component"
        :min-value="floors.min"
        :max-value="floors.max"
        :preset-min="preselectedFloors.min"
        :preset-max="preselectedFloors.max"
        :suffix="$t('labels.floorShort')"
        @change="handleChange"
      />
      <!-- <range-picker :ranges="ranges" :preselected="preselectedRanges" @change="handleChange" /> -->
    </div>
    <filters-footer-block :next-url="nextUrl" />
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import TitleWithLine from '@/components/partials/TitleWithLine'
import RangePicker from '@/components/partials/RangePicker'
import SelectRange from '@/components/partials/SelectRange'
import FiltersFooterBlock from '@/components/partials/FiltersFooterBlock'
export default {
  components: { TitleWithLine, SelectRange, FiltersFooterBlock },
  layout: 'ModelFilterLayout',
  middleware: 'RedirectIfNoModel',
  computed: {
    ...mapGetters({
      locale: 'locale',
      filters: 'Filter/filters',
      filterDefaults: 'Filter/filterDefaults'
    }),
    floors() {
      return {
        min: this.filterDefaults.min_floor,
        max: this.filterDefaults.max_floor
      }
    },
    nextUrl() {
      return `/${this.locale}/model/filter/views`
    },
    preselectedFloors() {
      return { ...this.filters.floors }
    }
  },
  methods: {
    ...mapMutations({
      setFilterItem: 'Filter/SET_FILTER_ITEM'
    }),
    ...mapActions({
      fetchFilteredFlats: 'Filter/fetchFilteredDataCount'
    }),
    handleChange(data) {
      this.setFilterItem({ key: 'floors', value: data })
      this.fetchFreshData()
    },
    fetchFreshData() {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.fetchFilteredFlats()
      }, 300)
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
