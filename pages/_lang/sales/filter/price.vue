<template>
  <div class="page-flat-container">
    <div class="page-flat-number">
      <div class="page-flat-number__title-container">
        <title-with-line
          class="page-flat-number__title"
          :title="$t('titles.PickPriceRange')"
        />
      </div>
      <select-range 
        class="range-picker"
        v-if="minPrice && maxPrice"
        :min-value="minPrice"
        :max-value="maxPrice"
        :preset-min="filterPrice.min"
        :preset-max="filterPrice.max"
        :step="1000"
        @change="handleChange"
        />
      <sale-filter-footer :next-url="nextUrl" @skip="skipPrice" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import TitleWithLine from '@/components/partials/TitleWithLine'
import SelectRange from '@/components/partials/SelectRange'
import SaleFilterFooter from '@/components/partials/SaleFilterFooter'

export default {
  components: {
    SelectRange,
    SaleFilterFooter,
    TitleWithLine,
  },
  layout: 'SalesFilterLayout',
  computed: {
    ...mapGetters({
      locale: 'locale',
      filterDefaults: 'Filter/filterDefaults',
      filters: 'Filter/filters'
    }),
    filterPrice() {
      return this.filters.price
    },
    minPrice() {
      return this.filterDefaults.min_price
    },
    maxPrice() {
      return this.filterDefaults.max_price
    },
    nextUrl() {
      return `/${this.locale}/sales/filter/building-status`
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
          key: 'price',
          value: data
        })
      }, 500)
    },
    skipPrice() {
      this.setFilter({
        key: 'price',
        value: this.filterPrice
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
.page-flat-number {
  margin: 60px;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  &__title {
    display: inline-block;
  }
  &__title-container {
    display: flex;
    flex-direction: column;

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
