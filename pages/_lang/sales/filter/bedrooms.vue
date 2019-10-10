<template>
  <div class="page-flat-container">
    <div class="page-flat-number">
      <div class="page-flat-number__title-container">
        <title-with-line
          class="page-flat-number__title"
          :title="$t('titles.ChooseBedroomCount')"
        />
        <small>{{$t('titles.YouCanSelectMultipe')}}</small>
      </div>
      <range-picker :ranges="bedroomsPickerData"/>
      <div class="border-line"></div>
      <div class="page-flat-number__title-container">
        <title-with-line
          class="page-flat-number__title"
          :title="$t('titles.ChooseFlatType')"
        />
        <small>{{$t('titles.YouCanSelectOnlyOne')}}</small>
      </div>
      <range-picker :ranges="flatTypes" :multiple="false" />
      <sale-filter-footer :next-url="nextUrl" @skip="skipPrice" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TitleWithLine from '@/components/partials/TitleWithLine'
import RangePicker from '@/components/partials/RangePicker'
import SaleFilterFooter from '@/components/partials/SaleFilterFooter'
import Bedroom0 from '@/components/icons/Bedroom0'
import Bedroom1 from '@/components/icons/Bedroom1'
import Bedroom2 from '@/components/icons/Bedroom2'
import Bedroom3 from '@/components/icons/Bedroom3'
import Bedroom4 from '@/components/icons/Bedroom4'
import Studio from '@/components/icons/Studio'
import KitchenDetached from '@/components/icons/Kitchen'
export default {
  components: {
    TitleWithLine,
    RangePicker,
    SaleFilterFooter
  },
  layout: 'SalesFilterLayout',
  data() {
    return {
      bedroomsPickerData: [
        {
          icon: Bedroom0,
          name: this.$t('rooms.NoBedroom'),
          value: 0
        },
        {
          icon: Bedroom1,
          name: this.$t('rooms.OneBedroom'),
          value: 1
        },
        {
          icon: Bedroom2,
          name: this.$t('rooms.TwoBedrooms'),
          value: 2
        },
        {
          icon: Bedroom3,
          name: this.$t('rooms.ThreeBedrooms'),
          value: 3
        },
        {
          icon: Bedroom4,
          name: this.$t('rooms.FourBedrooms'),
          value: 4
        },
      ],
      flatTypes: [
        {
          icon: KitchenDetached,
          name: this.$t('rooms.KitchenDetached'),
          value: 0
        },
        {
          icon: Studio,
          name: this.$t('rooms.Studio'),
          value: 1
        }
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
.border-line {
  width: 100%;
  border-top: 1px solid #f2d0ba;
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
