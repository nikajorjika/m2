<template>
  <div class="filter-list-page">
      <title-with-line :title="$t('titles.FavouriteFlats')" class="page-title"/>
      <div v-if="!loading" class="flat-list">
        <div v-for="(item, index) in flats" :key="index" class="flat-card">
            <flat-card 
                :title="item.title"
                :sub-title="item.subTitle"
                :price="item.price"
                :image="item.image"
                :bedroom-count="item.bedrooms_count"
                :url="item.url"
                :flat-id="item.id"
            />
        </div>
      </div>
      <div class="flat-list" v-else>
        <div v-for="(item, index) in loadingItems" :key="index" class="flat-card">
            <flat-card :loading="true"/>
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
    layout: 'SalesWithoutNavigation',
    data() {
        return {
            loadingItems: [1,1,1,1,1,1,1,1],
            page: 1,
            loading: true,
            flats: []
        }
    },
    mounted() {
      if(this.flats.length === 0) {
        this.fetchFreshFlatData()
      }
    },
    computed: {
        ...mapGetters({
            locale: 'locale',
        })
    },
    methods: {
        fetchFreshFlatData() {
            this.loading = true
            const userId = this.$auth.$state.user.id
            this.$axios(`/user/${userId}/saved-flats`).then(({data}) => {
              this.flats = data.map(item => {
                return {
                    id: item.id,
                    bedrooms_count: item.bedrooms_count,
                    title: item.flat.project_name[this.locale],
                    price: `${item.flat.price} $`,
                    image: item.flat.render_url,
                    url: `/${this.locale}/sales/customize/${item.flat.id}`,
                    subTitle: this.$t('titles.FlatCardSubTitle').replace('%s',item.flat.total_area)
                }
              })
              this.loading = false
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.filter-list-page {
    margin: 0 40px;
    max-height: calc(100% - 60px);
    display: flex;
    padding-bottom: 12px;
    flex-direction: column;
}
.page-title {
    margin: 50px 0;
}
.flat-list {
    display: grid;
    grid-template-columns: repeat(4, 214px);
    width: 100%;
    grid-column-gap: 72px;
    grid-row-gap: 46px;
    overflow-y: auto;
}
</style>