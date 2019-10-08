<template>
  <div class="page-flat-container">
    <div class="page-flat-number">
      <div class="page-flat-number__title-container">
        <title-with-line
          class="page-flat-number__title"
          :title="$t('titles.IAmLookingFor')"
        />
      </div>
      <select-range class="range-picker" />
      <sale-filter-footer />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TitleWithLine from '@/components/partials/TitleWithLine'
import SelectRange from '@/components/partials/SelectRange'
import SaleFilterFooter from '@/components/partials/SaleFilterFooter'

export default {
  components: {
    SelectRange,
    SaleFilterFooter,
    TitleWithLine,
  },
  layout: 'SalesFilterLayout',
  computed: {
    ...mapGetters({
      locale: 'locale',
      filters: 'Sales/filters'
    })
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
.page-flat-number {
  margin: 60px;
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
