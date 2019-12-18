<template>
  <div class="page-flat-container">
    <div class="page-flat-number">
      <div class="page-flat-number__title-container">
        <title-with-line
          class="page-flat-number__title"
          :title="$t('titles.IAmLookingFor')"
        />
        <small>{{ $t('titles.YouCanSelectOnlyOne') }}</small>
      </div>
      <picker-with-gradient-label
        :items="normalizePresets"
        :multiselect="false"
        class="caps"
        @change="handleChange"
      />
      <sale-filter-footer :next-url="nextUrl" @skip="skipPrice" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import TitleWithLine from '@/components/partials/TitleWithLine'
import PickerWithGradientLabel from '@/components/partials/PickerWithGradientLabel'
import SaleFilterFooter from '@/components/partials/SaleFilterFooter'
export default {
  components: {
    TitleWithLine,
    PickerWithGradientLabel,
    SaleFilterFooter
  },
  layout: 'SalesFilterLayout',
  middleware: 'isAuth',
  data() {
    return {
      chosenPresetArray: []
    }
  },
  computed: {
    ...mapGetters({
      locale: 'locale',
      presets: 'Filter/presets',
      defaultFilters: 'Filter/filterDefaults'
    }),
    nextUrl() {
      return `/${this.locale}/sales/filter/price`
    },
    icons() {
      return {
        Children: () => import(`@/components/icons/Children.vue`),
        Imigrent: () => import(`@/components/icons/Imigrent.vue`),
        Investment: () => import(`@/components/icons/Investment.vue`),
        Parents: () => import(`@/components/icons/Parents.vue`),
        Alone: () => import(`@/components/icons/Alone.vue`),
        Land: () => import(`@/components/icons/Land.vue`)
      }
    },
    chosenPreset() {
      if (!this.chosenPresetArray.length) return null
      return this.presets.find(
        (item) => this.chosenPresetArray[0].value === item.id
      )
    },
    bedroomCount() {
      if (!this.chosenPreset) return null
      const bedroomsArray = this.chosenPreset.preset.bedrooms.split(', ')
      return bedroomsArray.map((item) => {
        return {
          name: `# of Bedrooms ${item}`,
          value: parseInt(item)
        }
      })
    },
    normalizePresets() {
      const iconKeys = [
        'Children',
        'Imigrent',
        'Investment',
        'Parents',
        'Alone',
        'Land'
      ]
      return this.presets.map(({ id, name }, index) => {
        const icon = this.icons[iconKeys[index]]
        return {
          icon,
          name: name.hasOwnProperty(this.locale) ? name[this.locale] : name,
          value: id
        }
      })
    }
  },
  methods: {
    ...mapMutations({
      setFilterItem: 'Filter/SET_FILTER_ITEM',
      setFilterLoader: 'Filter/SET_FILTER_LOADER',
      setFilterDefaults: 'Filter/SET_FILTERS_BULK'
    }),
    handleChange(data) {
      this.setFilterDefaults(this.defaultFilters)
      this.chosenPresetArray = data
      const preset = this.chosenPreset.preset
      const filterData = {
        min_floor: preset.floors_from,
        max_floor: preset.floors_to,
        max_price: this.defaultFilters.max_price,
        min_price: this.defaultFilters.min_price,
        bedroom_count: preset.bedrooms.split(', '),
        type: preset.flat_type
        // wc: preset.wc
      }
      this.setFilterDefaults(filterData)
      this.setFilterLoader(true)
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
