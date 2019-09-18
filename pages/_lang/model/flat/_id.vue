<template>
  <div class="filter-flat">
    <div class="filter-flat__title">
      <title-with-line :title="cTitle" />
    </div>
    <div class="filter-flat__content">
      <div class="filter-flat__content__info">
        <flat-gradient-info :info="flatLocationInfo" />
        <list-card :items="listCardData" />
        <gradient-progress
          class="filter-render__aside__progress"
          :label="$t('labels.building_progress')"
          :min="0"
          :max="100"
          :value="builingStatus"
          suffix="%"
        />
      </div>
      <div class="filter-flat__content__render">
        <render-viewer
          class="flat-viewer"
          :render-image="renderUrl"
          :plan-image="blueprintUrl"
          gradient-text="2 საძინებელი"
        />
        <room-list-component class="room-list-slider" style-type="small" :room-list="rooms" />
      </div>
    </div>
    <div class="filter-flat__footer">
      <div class="footer-items">
        <gradient-label :text="price" class="price-label" />
        <div class="footer-items__controls">
          <div class="footer-items__controls__skip"></div>
          <div class="footer-items__controls__next">
            <button-main-orange
              :button-text="$t('labels.LitIt')"
              @click="handleLightUp"
            >
              <template v-slot:icon>
                <light-icon
                  class="flat-list-table__header__button__icon"
                  icon-color="#fff"
                  height="12px"
                />  
              </template>
            </button-main-orange>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleWithLine from '@/components/partials/TitleWithLine'
import RenderViewer from '@/components/partials/FlatRenderViewer'
import RoomListComponent from '@/components/partials/RoomListComponent'
import ListCard from '@/components/partials/ListCard'
import GradientProgress from '@/components/partials/GradientProgress'
import GradientLabel from '@/components/partials/GradientLabel'
import FlatGradientInfo from '@/components/partials/combinations/FlatGradientInfo'
import { formatPrice } from '@/utils/Mixed'
import ButtonMainOrange from '@/components/partials/ButtonMainOrange'
import LightIcon from '@/components/icons/Light'
import CaretRight from '@/components/icons/CaretRight'
import { mapGetters } from 'vuex'

export default {
  layout: 'WithoutNavigation',
  components: {
    TitleWithLine,
    RenderViewer,
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
      flat: null
    }
  },
  computed: {
    ...mapGetters(['locale']),
    cTitle() {
      return this.$t('titles.YourChosenFlat')
    },
    renderUrl() {
      if (!this.flat || !this.flat.render_url) return 'https://placehold.it/245x245'
      return this.flat.render_url
    },
    blueprintUrl() {
      if (!this.flat || !this.flat.blueprint_url) return 'https://placehold.it/245x245'
      return this.flat.blueprint_url
    },
    rooms() {
      if (!this.flat) return []
      return this.flat.rooms.map(item => {
        return {
          label: item.name[this.locale],
          value: `${item.area} ${this.$t('labels.m2')}`
        }
      })
    },
    price() {
      if (!this.flat) return 0
      return `${formatPrice(parseInt(this.flat.price))} $`
    },
    builingStatus() {
      if (!this.flat) return 0
      return this.flat.building_status
    },
    listCardData() {
      if (!this.flat) return
      const flatArea = this.flat.total_area - this.flat.balcony_area - this.flat.terrace_area
      return [
        {
          value: `${parseInt(this.flat.total_area)} ${this.$t('labels.m2')}`,
          label: this.$t('labels.total_area')
        },
        {
          value: `${flatArea} ${this.$t('labels.m2')}`,
          label: this.$t('labels.flat_area')
        },
        {
          value: `${this.flat.terrace_area} ${this.$t('labels.m2')}`,
          label: this.$t('labels.balcony_area_slash_terrace')
        }
      ]
    },
    flatLocationInfo() {
      if (!this.flat) return null
      const infoArray = [
        {
          label: this.$t('labels.block'),
          value: this.flat.block
        },
        {
          label: this.$t('labels.floor'),
          value: this.flat.floor.number
        },
        {
          label: this.$t('labels.flat'),
          value: this.flat.flat_number
        }
      ]
      return infoArray
    }
  },
  mounted() {
    this.$axios.get(`/flats/${this.$route.params.id}`).then((response) => {
      this.flat = response.data.data
    })
  },
  methods: {
    handleLightUp() {}
  }
}
</script>

<style lang="scss" scoped>
.filter-flat {
  height: 100%;
  width: 100%;
  padding: 49px 60px 38px 46px;
  display: grid;
  grid-template-areas: 'header header header' 'content content content' 'footer footer footer';
  grid-template-rows: 68px 75% 83px;
  &__title {
    grid-area: header;
  }
  &__content {
    grid-area: content;
    height: 100%;
    display: flex;
    width: 100%;
    &__info {
      width: 199px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    &__render {
      width: 724px;
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
  &__footer {
    grid-area: footer;
    display: flex;
    .footer-items {
      margin-top: auto;
      display: flex;
      justify-content: space-between;    
      width: 100%;
      .price-label {
        margin: auto 0;
      }
      &__controls {
        display: flex;
        margin-left: auto;
        width: 264px;
        justify-content: space-between;
        align-items: center;
        &__skip {
          color: #432272;
          font-size: 10px;
          font-size: $font;
          display: flex;
          align-items: center;
          &__icon {
            display: flex;
            svg {
              &:last-child {
                margin-left: -6px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
