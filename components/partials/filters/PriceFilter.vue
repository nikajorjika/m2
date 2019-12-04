<template>
    <div class="price-filters">
      <select-range 
        class="range-picker"
        v-if="minPrice >= 0 && maxPrice"
        :min-value="minPrice"
        :max-value="maxPrice"
        :preset-min="filterPrice.min"
        :preset-max="filterPrice.max"
        :suffix="suffix"
        :step="1000"
        @change="handleChange"
        />
        <div class="submit-filter">
            <button-main-orange
            class="button"
            :button-text="$t('buttons.select')"
            @click="handleFilter"
            >
            <template v-slot:icon>
                <caret-right width="14" height="16" icon-color="#fff" />
            </template>
            </button-main-orange>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import SelectRange from '@/components/partials/DashedSelectRange'
import ButtonMainOrange from '@/components/partials/ButtonMainOrange'
import ArrowRight from '@/components/icons/ArrowRight'
import CaretRight from '@/components/icons/CaretRight'
export default {
    components: {
        ButtonMainOrange,
        ArrowRight,
        CaretRight,
        SelectRange
    },
    computed: {
      ...mapGetters({
        locale: 'locale',
        currency: 'settings/currency',
        currencyRate: 'settings/currencyRate',
        filterDefaults: 'Filter/filterDefaults',
        filters: 'Filter/filters'
      }),
      filterPrice() {
        return {
          min: this.currency === 'GEL' ?
            this.$currencyConverter(this.filters.price.min, this.currency) :
            this.filters.price.min,
          max: this.currency === 'GEL' ?
            this.$currencyConverter(this.filters.price.max, this.currency) :
            this.filters.price.max
        }
      },
      minPrice() {
        return  this.currency === 'GEL' ?
          this.$currencyConverter(this.filterDefaults.min_price, this.currency) :
          this.filterDefaults.min_price
      },
      maxPrice() {
        return this.currency === 'GEL' ? 
          this.$currencyConverter(this.filterDefaults.max_price, this.currency) :
          this.filterDefaults.max_price
      },
      suffix() {
        return this.currency === 'GEL' ? '₾' : '$'
      }
    },
    data() {
        return {
            selected: {
                min: null,
                max: null
            }
        }
    },
    methods: {
    ...mapMutations({
      setFilter: 'Filter/SET_FILTER_ITEM',
      setLoader: 'Filter/SET_FILTER_LOADER'
    }),
    handleChange(data) {
      this.selected = { ...data }
    },
    handleFilter() {
      if(this.currency === 'GEL') {
        this.selected = {
          min: this.selected.min / this.currencyRate,
          max: this.selected.max / this.currencyRate
        }
      }
      this.setFilter({
        key: 'price',
        value: this.selected
      })
      this.$emit('change')
    }
  }
}
</script>

<style lang="scss" scoped>
.price-filters {
    display: flex;
    padding: 0 84px;
}
.range-picker {
    width: 541px;
}
.submit-filter {
    width: 218px;
    margin-left: auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.gel-icon {
  font-family: 'lari-symbol-v2', Arial, 'Times New Roman', 'Bitstream Charter',
    Times, serif !important;
  font-style: normal !important;
}
</style>

