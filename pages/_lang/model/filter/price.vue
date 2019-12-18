<template>
  <div class="filter-price">
    <div class="filter-price__title">
      <div class="filter-price__title__wrapper">
        <title-with-line :title="$t('labels.for_what_price')" />
        <currency-switcher class="filter-price__currency-switcher" />
      </div>
      <small>{{ $t('labels.pick_range') }}</small>
    </div>
    <div class="filter-price__range-selector">
      <select-range
        v-if="price.min >= 0 && price.max && !loading"
        class="filter-price__range-selector__component"
        :min-value="price.min"
        :max-value="price.max"
        :preset-min="filterPrice.min"
        :preset-max="filterPrice.max"
        :suffix="suffix"
        :step="1000"
        @change="handleRangeChange"
      />
    </div>
    <filters-footer-block :next-url="nextUrl" @skip="skipPrice" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TitleWithLine from '@/components/partials/TitleWithLine'
import CurrencySwitcher from '@/components/partials/CurrencySwitcher'
import SelectRange from '@/components/partials/SelectRange'
import FiltersFooterBlock from '@/components/partials/FiltersFooterBlock'
export default {
  components: {
    TitleWithLine,
    CurrencySwitcher,
    SelectRange,
    FiltersFooterBlock
  },
  layout: 'ModelFilterLayout',
  middleware: 'RedirectIfNoModel',
  data() {
    return {
      timeout: null,
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
      filters: 'Filter/filters',
      currency: 'settings/currency',
      currencyRate: 'settings/currencyRate',
      filterDefaults: 'Filter/filterDefaults'
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
    nextUrl() {
      return `/${this.locale}/model/filter/floor`
    },
    price() {
      return {
        min:
          this.currency === 'GEL'
            ? this.$currencyConverter(
                this.filterDefaults.min_price,
                this.currency
              )
            : this.filterDefaults.min_price,
        max:
          this.currency === 'GEL'
            ? this.$currencyConverter(
                this.filterDefaults.max_price,
                this.currency
              )
            : this.filterDefaults.max_price
      }
    },
    suffix() {
      return this.currency === 'GEL' ? '₾' : '$'
    }
  },
  methods: {
    ...mapActions({
      fetchFilteredFlats: 'Filter/fetchFilteredDataCount'
    }),
    handleCurrencyChange() {
      this.loading = true
      this.$nextTick(() => {
        this.loading = false
      })
    },
    handleRangeChange(data) {
      if (this.currency === 'GEL') {
        data = {
          min: data.min / this.currencyRate,
          max: data.max / this.currencyRate
        }
      }
      this.$store.commit('Filter/SET_FILTER_ITEM', {
        key: 'price',
        value: data
      })
      this.fetchFreshData()
    },
    fetchFreshData() {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.fetchFilteredFlats()
      }, 300)
    },
    skipPrice() {
      this.$store.commit('Filter/SET_FILTER_ITEM', {
        key: 'price',
        value: this.price
      })
      this.fetchFreshData()
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-price {
  padding: 50px 61px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &__currency-switcher {
    margin-left: auto;
  }
  &__title {
    display: flex;
    flex-direction: column;
    width: 639px;
    &__wrapper {
      display: flex;
    }
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
