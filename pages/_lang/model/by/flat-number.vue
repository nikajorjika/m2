<template>
  <div class="page-flat-number">
    <div class="page-flat-number__title-container">
      <title-with-line class="page-flat-number__title" :title="$t('titles.SearchByFlatNumber')" />
      <small>{{ $t('titles.SearchByFlatNumberSubTitle') }}</small>
    </div>
    <div class="page-flat-number__form">
      <search-form />
    </div>
  </div>
</template>

<script>
import TitleWithLine from '@/components/partials/TitleWithLine'
import SearchForm from '@/components/partials/SearchForm'
export default {
  components: { TitleWithLine, SearchForm },
  layout: 'WithoutNavigation'
}
</script>

<style lang="scss" scoped>
.page-flat-number {
  margin: 124px 60px;
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
  &__form {
    margin-top: 62px;
  }
}
</style>