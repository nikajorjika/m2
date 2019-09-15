<template>
  <div class="filter-floor">
    <div class="filter-floor__title">
      <div class="filter-floor__title__wrapper">
        <title-with-line :title="$t('labels.choose_flat_view')" />
      </div>
      <small>{{$t('labels.pick_multiple')}}</small>
    </div>
    <div class="filter-floor__range-selector">
      <views-picker :views="views" :preselected="viewFilterFromStore" @change="handleChange" />
    </div>
    <filters-footer-block :next-url="{ name: 'lang-model-list', params: { lang: locale } }" />
  </div>
</template>

<script>
import TitleWithLine from '@/components/partials/TitleWithLine'
import ViewsPicker from '@/components/partials/ViewsPicker'
import FiltersFooterBlock from '@/components/partials/FiltersFooterBlock'
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: { TitleWithLine, ViewsPicker, FiltersFooterBlock },
  layout: 'ModelFilterLayout',
  computed: {
    ...mapGetters({
      locale: 'locale',
      filters: 'Filter/filters'
    }),
    viewFilterFromStore() {
      return [...this.filters.view]
    }
  },
  data() {
    return {
      views: [
        'პირველი ხედი',
        'მეორე ხედით',
        'მესამე ხედით',
        'მეოთხე ხედით'
      ]
    }
  },
  methods: {
    ...mapMutations({
      setFilterItem: 'Filter/SET_FILTER_ITEM'
    }),
    handleChange(data) {
      this.setFilterItem({ key: 'view', value: data })
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