<template>
  <div class="page-flat-container">
    <div class="page-flat-number">
      <div class="page-flat-number__title-container">
        <title-with-line
          class="page-flat-number__title"
          :title="$t('titles.PickPriceRange')"
        />
        <currency-switcher />
      </div>
      <div class="warning" :class="{ active: totalCount === 0 }">
        <p>{{ $t('errors.NoFlatsInThisPriceRange') }}</p>
      </div>
      <select-range
        v-if="minPrice !== null && maxPrice && !loading"
        class="range-picker"
        :min-value="parseInt(minPrice)"
        :max-value="parseInt(maxPrice)"
        :preset-min="parseInt(filterPrice.min)"
        :preset-max="parseInt(filterPrice.max)"
        :step="1000"
        :suffix="suffix"
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
import CurrencySwitcher from '@/components/partials/CurrencySwitcher'

export default {
  components: {
    SelectRange,
    SaleFilterFooter,
    CurrencySwitcher,
    TitleWithLine
  },
  layout: 'SalesFilterLayout',
  middleware: 'isAuth',
  data() {
    return {
      loading: false
    }
  },
  watch: {
    suffix: {
      handler: 'handleCurrencyChange'
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
    filterPrice() {
      return {
        min:
          this.currency === 'GEL'
            ? this.$currencyConverter(this.filters.price.min, this.currency)
            : this.filters.price.min,
        max:
          this.currency === 'GEL'
            ? this.$currencyConverter(this.filters.price.max, this.currency)
            : this.filters.price.max
      }
    },
    minPrice() {
      return this.currency === 'GEL'
        ? this.$currencyConverter(this.filterDefaults.min_price, this.currency)
        : this.filterDefaults.min_price
    },
    maxPrice() {
      return this.currency === 'GEL'
        ? this.$currencyConverter(this.filterDefaults.max_price, this.currency)
        : this.filterDefaults.max_price
    },
    nextUrl() {
      return `/${this.locale}/sales/filter/building-status`
    },
    suffix() {
      return this.currency === 'GEL' ? '₾' : '$'
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
      if (this.currency === 'GEL') {
        data = {
          max: data.max / this.currencyRate,
          min: data.min / this.currencyRate
        }
      }
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
