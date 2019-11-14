<template>
  <div class="render-page">
    <tabs-navigation :tab-data="navigation" :active-tab-index="activeTab" @tabChange="handleTabChange"/>
    <div class="filter-flat">
      <div class="filter-flat__title">
        <title-with-line :title="cTitle" />
      </div>
      <div class="filter-flat__secondary-title">
        <title-with-line :title="$t('titles.PleaseSelectBlockFromRender')" />
        <small>{{$t('labels.select_only_one')}}</small>
      </div>
      <div class="filter-flat__content">
        <div class="filter-flat__content__info">
          <flat-gradient-info class="filter-flat__content__info__combo" :info="flatLocationInfo" />
          <!-- <list-card :items="listCardData" /> -->
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
          <filter-render 
            v-if="activeTab === 0" 
            @seleted="handleBlockSelect" 
            @changeNumber="handleBlockChange" 
          />
          <floor-picker
            v-if="activeTab === 1" 
            :block="activeBlock" 
            @seleted="handleFloorSelect" 
            @floorChosen="handleFloorChosen"
            @floorSelect="handleFloorSelect" 
          />
          <flat-picker
            v-if="activeTab === 2"
            :block="activeBlock" 
            :floor="filters.floors.min" 
            @flatSelected="selectedFlat"
          />
        </div>
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
import GradientBlock from '@/components/partials/GradientBlock'
import FlatGradientInfo from '@/components/partials/combinations/FlatGradientInfo'
import { formatPrice } from '@/utils/Mixed'
import ButtonMainOrange from '@/components/partials/ButtonMainOrange'
import LightIcon from '@/components/icons/Light'
import CaretRight from '@/components/icons/CaretRight'
import FilterRender from '@/components/partials/FilterRender'
import ProjectIcon from '@/components/icons/Project'
import MainIcon from '@/components/icons/Main'
import CompletedIcon from '@/components/icons/Completed'
import FloorIcon from '@/components/icons/Floor'
import BlockIcon from '@/components/icons/Block'
import FloorPicker from '@/components/partials/FloorPicker'
import TabsNavigation from '@/components/partials/TabsNavigation'
import FlatPicker from '@/components/partials/FlatPicker'

export default {
  layout: 'RenderFilterLayout',
  middleware: 'auth',
  components: {
    TitleWithLine,
    RenderViewer,
    FilterRender,
    FloorPicker,
    RoomListComponent,
    FlatGradientInfo,
    FlatPicker,
    TabsNavigation,
    ListCard,
    GradientProgress,
    GradientLabel,
    GradientBlock,
    ButtonMainOrange,
    LightIcon,
    CaretRight
  },
  data() {
    return {
      activeFloor: null,
      flat_number: null,
      activeBlock: null,
      flat: null,
      builingStatus: 70,
      listCardData: [],
      activeTab: 0
    }
  },
  computed: {
    ...mapGetters({
      locale: 'locale',
      filterDefaults: 'Filter/filterDefaults',
      filters: 'Filter/filters',
      block: 'Filter/chosenBlockNumber'
    }),
    navigation() {
      return [
        {
          title: 'navigation.block',
          component: BlockIcon,
          route: '/sales/render'
        },
        {
          title: 'navigation.floor',
          component: FloorIcon,
          route: '/sales/render/floor'
        },
        {
          title: 'navigation.floorPlan',
          component: FloorIcon,
          route: '/sales/render/flat'
        }
      ]
    },
    cTitle() {
      return `${this.$t('labels.project')}: <span class="color-orange">${this.$t('projects.m3_gelovani')}</span>  `
    },
    flatLocationInfo() {
      const block = this.block ? this.block : this.activeBlock
      const infoArray = [
        {
          label: this.$t('labels.block'),
          value: this.activeBlock
        },
        {
          label: this.$t('labels.floor'),
          value: this.activeFloor
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
    this.setFilterDefaults(this.filterDefaults)
  },
  methods: {
    ...mapMutations({
      setFilterItem: 'Filter/SET_FILTER_ITEM',
      setFilterDefaults: 'Filter/SET_FILTER_DEFAULTS'
    }),
    handleFloorChosen(floor) {
      this.setFilterItem({
        key: 'floors',
        value: {
          min: floor,
          max: floor
        }
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
      this.activeTab = ++this.activeTab
    },
    selectedFlat(flatNumber) {
      this.setFilterItem({
        key: 'flat_number',
        value: flatNumber
      })
    },
    handleBlockSelect(id) {
      this.setFilterItem({
        key: 'block',
        value: id
      })
      this.activeTab = ++this.activeTab
    },
    handleTabChange(index) {
      if(index === 0) {
        this.activeTab = index
      }
      if(index === 1 && this.activeBlock) {
        this.activeTab = index
      }
      if(index === 2 && this.activeBlock && this.floor) {
        this.activeTab = index
      } 
    },
    handleBlockChange(id) {
      this.activeBlock = id
    }
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

  &__title {
    grid-area: header;
  }
  &__secondary-title {
    grid-area: second-header;
    display: flex;
    flex-direction: column;
    small {
      font-family: $font;
      font-size: 10px;
      color: #494949;
      margin: 12px 0 0 0;
    }
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
