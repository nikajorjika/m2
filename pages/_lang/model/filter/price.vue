<template>
  <div class="filter-price">
    <div class="filter-price__title">
      <div class="filter-price__title__wrapper">
        <title-with-line :title="$t('labels.for_what_price')" />
      </div>
      <small>{{ $t('labels.pick_range') }}</small>
    </div>
    <div class="filter-price__range-selector">
      <select-range
        class="filter-price__range-selector__component"
        :min-value="price.min"
        :max-value="price.max"
        :preset-min="filterPrice.min"
        :preset-max="filterPrice.max"
        @change="handleRangeChange"
      />
    </div>
    <filters-footer-block :next-url="nextUrl" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TitleWithLine from '@/components/partials/TitleWithLine'
import SelectRange from '@/components/partials/SelectRange'
import FiltersFooterBlock from '@/components/partials/FiltersFooterBlock'
export default {
  components: { TitleWithLine, SelectRange, FiltersFooterBlock },
  layout: 'ModelFilterLayout',
  middleware: 'RedirectIfNoModel',
  data() {
    return {
      price: {
        min: 30000,
        max: 150000
      },
      timeout: null
    }
  },
  computed: {
    ...mapGetters({
      locale: 'locale',
      filters: 'Filter/filters'
    }),
    filterPrice() {
      return this.filters.price
    },
    nextUrl() {
      return `/${this.locale}/model/filter/floor`
    }
  },
  methods: {
    ...mapActions({
      fetchFilteredFlats: 'Filter/fetchFilteredFlats'
    }),
    handleRangeChange(data) {
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
  &__title {
    display: flex;
    flex-direction: column;
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
