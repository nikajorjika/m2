<template>
  <div class="filter-flat">
    <div class="filter-flat__title">
      <title-with-line :title="cTitle" />
    </div>
    <div class="filter-flat__secondary-title">
      <title-with-line :title="cTitle" />
    </div>
    <div class="filter-flat__content">
      <div class="filter-flat__content__info">
        <flat-gradient-info :info="flatLocationInfo" />
        <gradient-block class="filter-flat__content__info__address"> 
          <div class="address">
            <h3>{{$t('labels.address')}}:</h3>
            <p>{{$t('addresses.marshal_gelovani')}}</p>
          </div>
        </gradient-block>
        <gradient-progress
          class="filter-flat__content__info__progress"
          :label="$t('labels.sold_flat_count')"
          :min="0"
          :max="350"
          :value="58"
        />
        <gradient-progress
          class="filter-flat__content__info__progress"
          :label="$t('labels.building_progress')"
          :min="0"
          :max="100"
          :value="builingStatus"
          suffix="%"
        />
      </div>
      <div class="filter-flat__content__render">
        <floor-picker :block="block" 
          @seleted="handleBlockSelect" 
          @floorChosen="showFloor" 
          @floorSelect="handleFloorSelect" 
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import TitleWithLine from '@/components/partials/TitleWithLine'
import RenderViewer from '@/components/partials/FlatRenderViewer'
import RoomListComponent from '@/components/partials/RoomListComponent'
import ListCard from '@/components/partials/ListCard'
import GradientProgress from '@/components/partials/GradientProgress'
import GradientLabel from '@/components/partials/GradientLabel'
import FlatGradientInfo from '@/components/partials/combinations/FlatGradientInfo'
import { formatPrice } from '@/utils/Mixed'
import GradientBlock from '@/components/partials/GradientBlock'
import ButtonMainOrange from '@/components/partials/ButtonMainOrange'
import LightIcon from '@/components/icons/Light'
import CaretRight from '@/components/icons/CaretRight'
import FilterRender from '@/components/partials/FilterRender'
import FloorPicker from '@/components/partials/FloorPicker'

export default {
  layout: 'RenderFilterLayout',
  middleware: 'auth',
  components: {
    TitleWithLine,
    RenderViewer,
    FilterRender,
    GradientBlock ,
    FloorPicker,
    RoomListComponent,
    FlatGradientInfo,
    ListCard,
    GradientProgress,
    GradientLabel,
    ButtonMainOrange,
    LightIcon,
    CaretRight,
    GradientLabel
  },
  data() {
    return {
      flat: null,
      builingStatus: 70,
      listCardData: [],
      floor: 0,
      flat_number: null,
      step: 1
    }
  },
  computed: {
    ...mapGetters({
      locale: 'locale',
      block: 'Filter/chosenBlockNumber'
    }),
    cTitle() {
      return `${this.$t('labels.project')}: <span class="color-orange">${this.$t('projects.m3_gelovani')}</span>  `
    },
    flatLocationInfo() {
      const infoArray = [
        {
          label: this.$t('labels.block'),
          value: this.block
        },
        {
          label: this.$t('labels.floor'),
          value: this.floor
        },
        {
          label: this.$t('labels.flat'),
          value: this.flat_number
        }
      ]
      return infoArray
    }
  },
  mounted () {
    if(!this.block) {
      this.$router.push({
        name: 'lang-sales-render',
        params: {
          lang: this.locale
        }
      })
    }
  },
  methods: {
    ...mapMutations({
      setFilterItem: 'Filter/SET_FILTER_ITEM',
      setFilterDefaults: 'Filter/SET_FILTER_DEFAULTS'
    }),
    showFloor(floor) {
      this.floor = floor
    },
    handleBlockSelect(id) {
      this.setFilterItem({
        key: 'block',
        value: id
      })
    },
    handleFloorSelect(floor) {
      this.setFilterItem({
        key: 'floors',
        value: {
          min: floor,
          max: floor
        }
      })
      this.$router.push({
        name: 'lang-sales-render-flat',
        params: {
          lang: this.locale
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.filter-flat {
  height: 580px;
  width: 100%;
  padding: 49px 60px 38px 46px;
  display: grid;
  grid-template-areas: 'header second-header' 'content content';
  grid-template-rows: 79px 415px;
  grid-template-columns: 240px 805px;
  box-sizing: border-box;
  .mt-auto {
    margin-top: auto;
    margin-bottom: 12px;
  }
  &__title {
    grid-area: header;
  }
  &__secondary-title {
    grid-area: second-header;
  }
  &__content {
    grid-area: content;
    height: 100%;
    display: flex;
    width: 100%;
    &__info {
      width: 215px;
      display: flex;
      flex-direction: column;
      // justify-content: space-between;
      &__address {
        margin-top: 12px;
        h3 {
          font-size: 12px;
          font-family: $font;
          margin: 0 0 10px;
        }
        p {
          font-size: 11px;
          font-family: $font;
          margin: 10px 0 0;
        }
      }
      &__combo {
        min-height: 106px;
      }
      &__progress {
        margin-top: 12px;
      }
    }
    &__render {
      width: 804px;
      margin-left: auto;
      display: flex;
      .room-list-slider {
        width: 305px;
        background: #f7ede2;
        border-top-right-radius: 17px;
        border-bottom-right-radius: 17px;
      }
      .flat-viewer {
        width: 419px;
      }
    }
  }
}
</style>
