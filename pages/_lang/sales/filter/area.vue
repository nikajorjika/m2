<template>
  <div class="page-flat-container">
    <div class="page-flat-number">
      <div class="page-flat-number__title-container">
        <title-with-line
          class="page-flat-number__title"
          :title="$t('titles.PickAreaRange')"
        />
      </div>
      <div class="warning" :class="{ active: totalCount === 0 }">
        <p>{{ $t('errors.NoFlatsInThisAreaRange') }}</p>
      </div>
      <select-range
        v-if="minArea !== null && maxArea && !loading"
        class="range-picker"
        :min-value="parseInt(minArea)"
        :max-value="parseInt(maxArea)"
        :preset-min="parseInt(filterArea.min)"
        :preset-max="parseInt(filterArea.max)"
        :step="1"
        :suffix="suffix"
        @change="handleChange"
      />
      <sale-filter-footer :next-url="nextUrl" @skip="skipPrice" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import TitleWithLine from '@/components/partials/TitleWithLine'
import SelectRange from '@/components/partials/SelectRange'
import SaleFilterFooter from '@/components/partials/SaleFilterFooter'

export default {
  components: {
    SelectRange,
    SaleFilterFooter,
    TitleWithLine
  },
  layout: 'SalesFilterLayout',
  middleware: 'isAuth',
  data() {
    return {
      loading: false
    }
  },
  computed: {
    ...mapGetters({
      locale: 'locale',
      filterDefaults: 'Filter/filterDefaults',
      filters: 'Filter/filters',
      currency: 'settings/currency',
      currencyRate: 'settings/currencyRate',
      totalCount: 'Filter/totalCount'
    }),
    filterArea() {
      return {
        min: this.filters.area.min,
        max: this.filters.area.max
      }
    },
    minArea() {
      return this.filterDefaults.min_area
    },
    maxArea() {
      return this.filterDefaults.max_area
    },
    nextUrl() {
      return `/${this.locale}/sales/filter/price`
    },
    suffix() {
      return this.$t('labels.m2')
    }
  },
  watch: {
    suffix: {
      handler: 'handleCurrencyChange'
    }
  },
  methods: {
    ...mapMutations({
      setFilter: 'Filter/SET_FILTER_ITEM',
      setLoader: 'Filter/SET_FILTER_LOADER'
    }),
    handleChange(data) {
      clearTimeout(this.timeout)
      this.setLoader(true)
      this.timeout = setTimeout(() => {
        this.setFilter({
          key: 'area',
          value: data
        })
      }, 500)
    },
    skipPrice() {
      this.setFilter({
        key: 'area',
        value: this.filterArea
      })
    },
    handleCurrencyChange() {
      this.loading = true
      this.$nextTick(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-flat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.range-picker {
  max-width: 686px;
}
.warning {
  font-size: 12px;
  color: $orange;
  visibility: hidden;
  &.active {
    visibility: visible;
  }
}
.page-flat-number {
  margin: 60px;
  margin-bottom: 30px;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  &__title {
    display: inline-block;
  }
  &__title-container {
    display: flex;
    max-width: 684px;
    justify-content: space-between;
    small {
      font-size: 10px;
      font-family: $font;
      color: #424242;
      margin-top: 13px;
    }
  }
  &__confirm,
  &__form {
    margin-top: 62px;
  }
  &__buttons {
    display: flex;
    flex-direction: column;
    margin-top: auto;
    small {
      font-size: 10px;
      color: #424242;
      font-family: $font;
      margin-bottom: 42px;
    }
    .filter-illustation-icon {
      margin: 0 0 0 -12px;
    }
  }
}
</style>
