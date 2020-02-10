<template>
  <div class="page-flat-container">
    <div class="page-flat-number">
      <div class="page-flat-number__title-container">
        <title-with-line
          class="page-flat-number__title"
          :title="$t('titles.PickFloorRange')"
        />
      </div>
      <div class="warning" :class="{ active: totalCount === 0 }">
        <p>{{ $t('errors.NoFlatsInThisFloorRange') }}</p>
      </div>
      <select-range
        v-if="minFloor >= 0 && maxFloor && !loading"
        class="range-picker"
        :min-value="minFloor"
        :max-value="maxFloor"
        :preset-min="filterFloor.min"
        :preset-max="filterFloor.max"
        :step="1"
        :suffix="$t('labels.floorShort')"
        @change="handleChange"
      />
      <sale-filter-footer :next-url="nextUrl" @skip="skipFloor" />
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
  middleware: 'isAuth',
  layout: 'SalesFilterLayout',
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
      setByPresets: 'Filter/setByPresets',
      totalCount: 'Filter/totalCount'
    }),
    filterFloor() {
      return this.filters.floors
    },
    minFloor() {
      return this.filterDefaults.min_floor
    },
    maxFloor() {
      return this.filterDefaults.max_floor
    },
    nextUrl() {
      const filterString = JSON.stringify(this.filters)
      return {
        name: 'lang-sales-filter-list',
        params: {
          lang: this.locale
        },
        query: {
          filters: filterString
        }
      }
    }
  },
  mounted() {
    this.$eventBus.$on('closeModal', () => {
      this.loading = true
      this.$nextTick(() => (this.loading = false))
    })
  },
  methods: {
    ...mapMutations({
      setFilter: 'Filter/SET_FILTER_ITEM',
      setLoader: 'Filter/SET_FILTER_LOADER'
    }),
    handleChange(data) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        const filter = { ...this.filterFloor }
        data.min = data.min ? data.min : 0
        filter.min = filter.min ? filter.min : 0
        const isInitial =
          parseInt(filter.min) === parseInt(data.min) &&
          parseInt(filter.max) === parseInt(data.max)

        if (this.setByPresets && !isInitial) {
          this.$eventBus.$emit('openModal', 'modal-remove-preset-filters', {
            filters: { ...this.filters },
            change: {
              key: 'floors',
              value: data
            }
          })
        } else {
          this.setLoader(true)
          this.setFilter({
            key: 'floors',
            value: data
          })
        }
      }, 500)
    },
    skipFloor() {
      this.setFilter({
        key: 'floors',
        value: this.filterFloor
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
