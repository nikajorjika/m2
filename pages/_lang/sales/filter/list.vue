<template>
  <div class="filter-list-page">
    <div class="filter-list-page__header">
      <title-with-line :title="$t('titles.SearchResults')" class="page-title" />
      <currency-switcher />
    </div>
    <div v-show="!loading" class="list-scrollable-wrapper">
      <div class="flat-list">
        <div v-for="(item, index) in flats" :key="index" class="flat-card">
          <flat-card
            :title="item.title"
            :sub-title="item.subTitle"
            :price="item.price"
            :image="item.image"
            :url="item.url"
            :bedroom-count="item.bedrooms_count"
            :flat-id="item.id"
            :favourite="item.favourite"
          />
        </div>
      </div>
      <div v-show="isEmpty && !loading">
        <p>{{ $t('labels.NoFlatsFound') }}</p>
      </div>
      <list-loading
        ref="Loading"
        v-show="shouldLoadMore"
        @load="handleLoad"
        class="load-more"
      />
    </div>
    <div v-if="loading" class="flat-list">
      <div v-for="(item, index) in loadingItems" :key="index" class="flat-card">
        <flat-card :loading="true" :flat-id="0" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import FlatCard from '@/components/partials/FlatCard'
import CurrencySwitcher from '@/components/partials/CurrencySwitcher'
import TitleWithLine from '@/components/partials/TitleWithLine'
import ListLoading from '@/components/partials/ListLoading'
export default {
  components: {
    CurrencySwitcher,
    FlatCard,
    ListLoading,
    TitleWithLine
  },
  middleware: 'isAuth',
  layout: 'WithInlineFilters',
  data() {
    return {
      loadingItems: [1, 1, 1, 1, 1, 1, 1, 1],
      isEmpty: false,
      shouldLoadMore: false,
      isFetching: false,
      page: 1,
      options: {
        root: null,
        threshold: 0
      }
    }
  },
  computed: {
    ...mapGetters({
      locale: 'locale',
      filters: 'Filter/filters',
      filterDefaults: 'Filter/filterDefaults',
      loading: 'Filter/filterLoading',
      flatsState: 'Filter/flats'
    }),
    computedFilters() {
      return { ...this.filters }
    },
    flats() {
      return this.flatsState.map((item) => {
        return {
          title: item.project_name[this.locale],
          bedrooms_count: item.bedrooms_count,
          id: item.id,
          price: `${item.price} $`,
          image: item.render_url,
          url: `/${this.locale}/sales/customize/${item.id}`,
          subTitle: this.$t('titles.FlatCardSubTitle').replace(
            '%s',
            item.total_area
          ),
          favourite: item.favourite
        }
      })
    }
  },
  watch: {
    computedFilters: {
      handler: 'updateQueryString'
    }
  },
  mounted() {
    if (this.$route.query.hasOwnProperty('filters')) {
      const filters = JSON.parse(this.$route.query.filters)
      filters.min_floor = parseInt(filters.floors.min)
      filters.max_floor = parseInt(filters.floors.max)
      filters.min_price = parseInt(filters.price.min)
      filters.max_price = parseInt(filters.price.max)
      this.setFilters(filters)
    }
    this.fetchFreshFlatData()
  },
  beforeDestroy() {
    this.setFilterDefaults(this.filterDefaults)
  },
  methods: {
    ...mapMutations({
      setLoader: 'Filter/SET_FILTER_LOADER',
      setFilters: 'Filter/SET_FILTERS_BULK',
      setFilterDefaults: 'Filter/SET_FILTER_DEFAULTS'
    }),
    ...mapActions({
      fetchFlats: 'Filter/fetchFilteredFlats'
    }),
    fetchFreshFlatData() {
      this.fetchFlats({ page: this.page, fresh: true }).then((response) => {
        this.isEmpty = !response.length
        this.page++
        this.shouldLoadMore = true
      })
    },
    handleLoad(data) {
      if (this.shouldLoadMore && !this.isFetching) {
        this.isFetching = true
        this.fetchFlats({
          page: this.page,
          fresh: false,
          noLoading: true
        }).then((response) => {
          if (response.length < 16) {
            this.shouldLoadMore = false
          } else {
            this.page++
            this.shouldLoadMore = true
          }
          this.isFetching = false
        })
      }
    },
    updateQueryString() {
      this.$router.push({
        path: this.$router.path,
        query: {
          filters: JSON.stringify(this.filters)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-list-page {
  margin: 0 40px;
  max-height: calc(100% - 76px);
  display: flex;
  padding-bottom: 12px;
  flex-direction: column;
  &__header {
    display: flex;
    justify-content: space-between;
  }
}
.load-more {
  text-align: center;
}
.page-title {
  margin: 50px 0;
}
.list-scrollable-wrapper {
  max-height: calc(100% - 12px);
  overflow-y: auto;
  padding-right: 17px;
}
.flat-list {
  display: grid;
  grid-template-columns: repeat(4, 214px);
  width: 100%;
  grid-column-gap: 60px;
  grid-row-gap: 46px;
  padding-bottom: 30px;
}
</style>
