<template>
  <div class="filter-floor">
    <div class="filter-floor__title">
      <div class="filter-floor__title__wrapper">
        <title-with-line :title="$t('labels.choose_flat_view')" />
      </div>
      <small>{{ $t('labels.pick_multiple') }}</small>
    </div>
    <div class="filter-floor__range-selector">
      <views-picker
        :views="views"
        :preselected="viewFilterFromStore"
        @change="handleChange"
      />
    </div>
    <filters-footer-block :no-skip="true" @next="handleNext" />
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import TitleWithLine from '@/components/partials/TitleWithLine'
import ViewsPicker from '@/components/partials/ViewsPicker'
import FiltersFooterBlock from '@/components/partials/FiltersFooterBlock'
export default {
  components: { TitleWithLine, ViewsPicker, FiltersFooterBlock },
  layout: 'ModelFilterLayout',
  middleware: 'RedirectIfNoModel',
  computed: {
    ...mapGetters({
      locale: 'locale',
      filters: 'Filter/filters',
      filterDefaults: 'Filter/filterDefaults'
    }),
    viewFilterFromStore() {
      return [...this.filters.view]
    },
    views() {
      const views = this.filterDefaults.views.map((item) => {
        return {
          name: item.name[this.locale],
          value: item.id
        }
      })
      return views
    }
  },
  mounted() {
    this.fetchFilteredDataCount()
  },
  methods: {
    ...mapMutations({
      setFilterItem: 'Filter/SET_FILTER_VIEWS'
    }),
    ...mapActions({
      fetchFilteredDataCount: 'Filter/fetchFilteredDataCount'
    }),
    handleChange(data) {
      this.setFilterItem(data)
      this.fetchFilteredDataCount()
    },
    handleNext() {
      this.$router.push({
        name: 'lang-model-list',
        params: { lang: this.locale },
        query: {
          filters: JSON.stringify(this.filters)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-floor {
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
    width: 58%;
  }
}
</style>
