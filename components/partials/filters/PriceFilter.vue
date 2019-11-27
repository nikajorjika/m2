<template>
    <div class="price-filters">
      <select-range 
        class="range-picker"
        v-if="minPrice >= 0 && maxPrice"
        :min-value="minPrice"
        :max-value="maxPrice"
        :preset-min="filterPrice.min"
        :preset-max="filterPrice.max"
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
</style>

