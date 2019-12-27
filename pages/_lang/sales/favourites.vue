<template>
  <div class="filter-list-page">
    <div class="title-wrapper">
      <title-with-line
        :title="$t('titles.FavouriteFlats')"
        class="page-title"
      />
      <currency-switcher class="fav-switcher" />
    </div>
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
          :sold="item.status === 'sold'"
        />
      </div>
    </div>
    <div v-else class="flat-list">
      <div v-for="(item, index) in loadingItems" :key="index" class="flat-card">
        <flat-card :loading="true" :flat-id="0" />
      </div>
    </div>
    <div v-if="isEmpty">
      {{ $t('errors.NoItemsInYourFavourites') }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FlatCard from '@/components/partials/FlatCard'
import TitleWithLine from '@/components/partials/TitleWithLine'
import CurrencySwitcher from '@/components/partials/CurrencySwitcher'
export default {
  components: {
    CurrencySwitcher,
    FlatCard,
    TitleWithLine
  },
  middleware: 'isAuth',
  layout: 'SalesWithoutNavigation',
  data() {
    return {
      loadingItems: [1, 1, 1, 1, 1, 1, 1, 1],
      page: 1,
      loading: true,
      isEmpty: false,
      flats: []
    }
  },
  computed: {
    ...mapGetters({
      locale: 'locale',
      user: 'auth/user'
    })
  },
  mounted() {
    if (this.flats.length === 0) {
      this.fetchFreshFlatData()
    }
  },
  methods: {
    fetchFreshFlatData() {
      this.loading = true
      const userId = this.user.id
      // const userId = this.$auth.$state.user.id
      this.$axios(`/user/${userId}/saved-flats`).then(({ data }) => {
        const flats = data.data ? data.data : []

        if (flats.length === 0) {
          this.isEmpty = true
        }

        this.flats = flats.map((item) => {
          return {
            id: item.flat.id,
            bedrooms_count: item.bedrooms_count,
            title: item.flat.project_name[this.locale],
            price: `${item.flat.price} $`,
            image: item.flat.render_url,
            status: item.flat.status,
            url: `/${this.locale}/sales/customize/${item.flat.id}`,
            subTitle: this.$t('titles.FlatCardSubTitle').replace(
              '%s',
              item.flat.total_area
            )
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
  height: 100%;
  display: flex;
  padding-bottom: 12px;
  flex-direction: column;
}
.title-wrapper {
  display: flex;
  .fav-switcher {
    margin-left: auto;
  }
}
.page-title {
  margin: 50px 0;
}
.flat-list {
  display: grid;
  grid-template-columns: repeat(4, 214px);
  width: 100%;
  height: 100%;
  grid-column-gap: 16px;
  grid-row-gap: 46px;
  padding-bottom: 30px;
  overflow-y: auto;
}
</style>
