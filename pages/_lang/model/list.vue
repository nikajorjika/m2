<template>
  <div class="flat-list">
    <div class="flat-list__title">
      <title-with-line :title="cTitle" />
      <small>{{$t('titles.YouCanSelectMultipe')}}</small>
    </div>
    <flat-list-table class="flat-list__table" :list="flats" />
  </div>
</template>

<script>
import TitleWithLine from '@/components/partials/TitleWithLine'
import FlatListTable from '@/components/partials/FlatListTable'
import { mapGetters } from 'vuex'
export default {
  layout: 'FullHeightWithoutNavigation',
  components: { TitleWithLine, FlatListTable },
  computed: {
    ...mapGetters({
      flats: 'Filter/flats'
    }),
    cTitle: function() {
      return this.$t('titles.flat-list-result-title').replace('%s', this.flats.length)
    }
  }
}
</script>

<style lang="scss" scoped>
.flat-list {
  padding: 48px 0 0 61px;
  height: 100%;
  &__title {
    display: flex;
    flex-direction: column;
    small {
      font-size: 10px;
      font-family: $font;
      margin-top: 12px;
    }
  }
  &__table {
    margin-top: 47px; 
    height: 80%;
  }
}
</style>