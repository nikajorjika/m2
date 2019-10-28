<template>
    <div class="price-filters">
      <select-range 
        class="range-picker"
        v-if="maxFloor && minFloor !== null"
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

