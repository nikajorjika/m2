<template>
  <div class="filter-list-page">
      <title-with-line :title="$t('titles.SearchResults')" class="page-title"/>
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
            />
          </div>
        </div>
        <div v-if="isEmpty && !loading">
            <p>{{$t('labels.NoFlatsFound')}}</p>
        </div>
        <div v-if="shouldLoadMore" ref="Loading" class="load-more">
            loading...
        </div>
      </div>
      <div class="flat-list" v-if="loading">
        <div v-for="(item, index) in loadingItems" :key="index" class="flat-card">
            <flat-card :loading="true" :flat-id="0"/>
        </div>
      </div>
  </div>
</template>

<script>
import FlatCard from '@/components/partials/FlatCard'
import TitleWithLine from '@/components/partials/TitleWithLine'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
    components: {
        FlatCard,
        TitleWithLine
    },
    middleware: 'isAuth',
    layout: 'WithInlineFilters',
    data() {
        return {
            loadingItems: [1,1,1,1,1,1,1,1],
            observer: null,
            isEmpty: false,
            shouldLoadMore: true,
            isFetching: false,
            page: 1,
            options: {
                root: null,
                threshold: 0
            }
        }
    },
    watch: {
      computedFilters: {
        handler: 'updateQueryString'
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
                    subTitle: this.$t('titles.FlatCardSubTitle').replace('%s',item.total_area)
                }
            })
        }
    },
    mounted() {
        if(this.$route.query.hasOwnProperty('filters')){
            const filters = JSON.parse(this.$route.query.filters)
            filters.block = filters.block
            filters.min_floor = filters.floors.min
            filters.max_floor = filters.floors.max
            filters.min_price = filters.price.min
            filters.max_price = filters.price.max
            this.setFilters(filters)
        }
        this.fetchFreshFlatData()
    },
    beforeDestroy () {
        this.setFilterDefaults(this.filterDefaults)
    },
    methods: {
        ...mapMutations({
            setLoader: 'Filter/SET_FILTER_LOADER',
            setFilters: 'Filter/SET_FILTERS_BULK',
            setFilterDefaults: 'Filter/SET_FILTER_DEFAULTS',

        }),
        ...mapActions({
            fetchFlats: 'Filter/fetchFilteredFlats'
        }),
        fetchFreshFlatData() {
          this.fetchFlats({ page: this.page, fresh: true })
            .then(response => {
              this.isEmpty = !response.length
              this.page++
              this.observe()
            })
        },
        callback(data) {
          if(this.shouldLoadMore && data[0].isIntersecting && !this.isFetching) {
            this.isFetching = true
            this.fetchFlats({ page: this.page, fresh: false, noLoading: true })
              .then(response => {
                if(response.length < 16) {
                  this.shouldLoadMore = false
                }else {
                  this.page++
                  this.shouldLoadMore = true
                }
              this.isFetching = false
              })
          }
        },
        observe() {
          this.observer = new IntersectionObserver(this.callback, this.options)
          this.observer.observe(this.$refs.Loading)
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