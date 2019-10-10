<template>
  <div class="page-flat-container">
    <div class="page-flat-number">
      <div class="page-flat-number__title-container">
        <title-with-line
          class="page-flat-number__title"
          :title="$t('titles.BuildingProgress')"
        />
      </div>
      <picker-with-gradient-label :items="pickerData"/>
      <sale-filter-footer :next-url="nextUrl" @skip="skipPrice" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TitleWithLine from '@/components/partials/TitleWithLine'
import PickerWithGradientLabel from '@/components/partials/PickerWithGradientLabel'
import SaleFilterFooter from '@/components/partials/SaleFilterFooter'
import CompletedIcon from '@/components/icons/Completed'
import PlannedIcon from '@/components/icons/Planned'
import InProgressIcon from '@/components/icons/InProgress'
export default {
  components: {
    TitleWithLine,
    PickerWithGradientLabel,
    SaleFilterFooter
  },
  layout: 'SalesFilterLayout',
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
        },
      ]
    }
  },
  computed: {
    ...mapGetters({
      locale: 'locale'
    }),
    nextUrl() {
      return `/${this.locale}/sales/filter/price`
    }
  },
  methods: {
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
