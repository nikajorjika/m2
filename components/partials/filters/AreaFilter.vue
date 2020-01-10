<template>
  <div class="price-filters">
    <select-range
      v-if="minArea >= 0 && maxArea"
      class="range-picker"
      :min-value="minArea"
      :max-value="maxArea"
      :preset-min="filterArea.min"
      :preset-max="filterArea.max"
      :suffix="$t('labels.m2')"
      :step="1"
      @change="handleChange"
    />
    <div class="submit-filter">
      <button-main-orange
        class="button"
        :button-text="$t('buttons.select')"
        text-padding="0 15px 0 32px"
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
import { mapGetters, mapMutations } from 'vuex'
import SelectRange from '@/components/partials/DashedSelectRange'
import ButtonMainOrange from '@/components/partials/ButtonMainOrange'
import CaretRight from '@/components/icons/CaretRight'
export default {
  components: {
    ButtonMainOrange,
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
    data() {
      return {
        selected: {
          min: null,
          max: null
        }
      }
    },
    filterArea() {
      return this.filters.area
    },
    minArea() {
      return this.filterDefaults.min_area
    },
    maxArea() {
      return this.filterDefaults.max_area
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
        key: 'area',
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
