<template>
  <div class="price-filters">
    <select-range
      v-if="maxFloor && minFloor !== null"
      class="range-picker"
      :min-value="minFloor"
      :max-value="maxFloor"
      :preset-min="filterFloor.min"
      :preset-max="filterFloor.max"
      :step="1"
      :suffix="$t('labels.floorShort')"
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
  data() {
    return {
      selected: {
        min: null,
        max: null
      }
    }
  },
  computed: {
    ...mapGetters({
      locale: 'locale',
      filterDefaults: 'Filter/filterDefaults',
      filters: 'Filter/filters'
    }),
    filterFloor() {
      return this.filters.floors
    },
    minFloor() {
      return this.filterDefaults.min_floor
    },
    maxFloor() {
      return this.filterDefaults.max_floor
    }
  },
  methods: {
    ...mapMutations({
      setFilter: 'Filter/SET_FILTER_ITEM'
    }),
    handleChange(data) {
      this.selected = { ...data }
    },
    handleFilter() {
      this.setFilter({
        key: 'floors',
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
