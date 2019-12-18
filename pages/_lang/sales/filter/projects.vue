<template>
  <div class="page-flat-container">
    <div class="page-flat-number">
      <div class="page-flat-number__title-container">
        <title-with-line
          class="page-flat-number__title"
          :title="$t('titles.ChooseProjects')"
        />
      </div>
      <!-- <picker-with-gradient-label :items="pickerData"/> -->
      <div class="page-flat-number__render">
        <filter-render
          :preselected="block"
          @seleted="handleBlockSelect"
          @change="handleBlockChange"
          @beforeChange="handleBeforeChange"
        />
      </div>
      <sale-filter-footer :next-url="nextUrl" @skip="skipPrice" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import TitleWithLine from '@/components/partials/TitleWithLine'
import PickerWithGradientLabel from '@/components/partials/PickerWithGradientLabel'
import SaleFilterFooter from '@/components/partials/SaleFilterFooter'
import CompletedIcon from '@/components/icons/Completed'
import PlannedIcon from '@/components/icons/Planned'
import InProgressIcon from '@/components/icons/InProgress'
import FilterRender from '@/components/partials/FilterRender'
export default {
  components: {
    TitleWithLine,
    PickerWithGradientLabel,
    FilterRender,
    SaleFilterFooter
  },
  layout: 'SalesFilterLayout',
  middleware: 'isAuth',
  data() {
    return {
      pickerData: [
        {
          icon: CompletedIcon,
          name: this.$t('status.finished'),
          value: 'finished'
        },
        {
          icon: PlannedIcon,
          name: this.$t('status.planned'),
          value: 'planned'
        },
        {
          icon: InProgressIcon,
          name: this.$t('status.ongoing'),
          value: 'ongoing'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      locale: 'locale',
      filters: 'Filter/filters'
    }),
    nextUrl() {
      return `/${this.locale}/sales/filter/floor`
    },
    block() {
      return this.filters.block
    }
  },
  methods: {
    ...mapMutations({
      setloader: 'Filter/SET_FILTER_LOADER',
      setFilter: 'Filter/SET_FILTER_ITEM'
    }),
    handleBlockSelect(value) {
      this.setFilter({
        key: 'block',
        value
      })
      this.$router.push(this.nextUrl)
    },
    handleBeforeChange(value) {
      this.setloader(true)
    },
    handleBlockChange(value) {
      if (this.filters.block === value) {
        this.setloader(false)
      }
      this.setFilter({
        key: 'block',
        value
      })
    },
    skipPrice() {
      this.$router.push(this.nextUrl)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-flat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.page-flat-number {
  margin: 60px;
  margin-bottom: 30px;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  &__title {
    display: inline-block;
  }
  &__render {
    max-height: 356px;
    margin: 17px 324px 17px 0;
    box-shadow: 0px 7px 34.56px 1.44px rgba(242, 101, 41, 0.16);
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
