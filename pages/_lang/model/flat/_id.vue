<template>
  <div class="filter-flat model-flat">
    <div class="filter-flat__title">
      <title-with-line :title="cTitle" />
    </div>
    <div class="filter-flat__content">
      <div class="filter-flat__content__info">
        <flat-gradient-info :info="flatLocationInfo" />
        <list-card :items="listCardData" />
        <gradient-progress
          :label="$t('labels.building_progress')"
          :min="0"
          :max="100"
          :value="builingStatus"
          class="filter-render__aside__progress"
          suffix="%"
        />
      </div>
      <div class="filter-flat__content__render">
        <render-viewer
          :render-image="renderUrl"
          :plan-image="blueprintUrl"
          :gradient-text="imageLabel"
          class="flat-viewer"
        />
        <room-list-component
          v-if="rooms.length"
          :room-list="rooms"
          class="room-list-slider"
          style-type="small"
        />
      </div>
    </div>
    <div class="filter-flat__footer">
      <div class="footer-items">
        <price-container
          v-if="price && rate"
          :price="price"
          :text-before-price="$t('labels.price')"
        />

        <currency-switcher v-if="flat" />

        <div class="footer-items__controls">
          <div class="footer-items__controls__skip"></div>
          <div class="footer-items__controls__next">
            <button-main-orange
              v-if="planshetColor"
              :button-text="$t('labels.LitIt')"
              :disabled="buttonDisabled"
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
import { mapActions, mapGetters, mapMutations } from 'vuex'
import TitleWithLine from '@/components/partials/TitleWithLine'
import RenderViewer from '@/components/partials/FlatRenderViewer'
import RoomListComponent from '@/components/partials/RoomListComponent'
import ListCard from '@/components/partials/ListCard'
import GradientProgress from '@/components/partials/GradientProgress'
import FlatGradientInfo from '@/components/partials/combinations/FlatGradientInfo'
import ButtonMainOrange from '@/components/partials/ButtonMainOrange'
import LightIcon from '@/components/icons/Light'
import PriceContainer from '@/components/partials/Price'
import CurrencySwitcher from '@/components/partials/CurrencySwitcher'

export default {
  layout: 'WithoutNavigation',
  components: {
    TitleWithLine,
    RenderViewer,
    RoomListComponent,
    FlatGradientInfo,
    ListCard,
    GradientProgress,
    ButtonMainOrange,
    LightIcon,
    PriceContainer,
    CurrencySwitcher
  },
  data() {
    return {
      flat: null
    }
  },
  computed: {
    ...mapGetters({
      locale: 'locale',
      showPrompt: 'Filter/showPrompt',
      rate: 'settings/currencyRate'
    }),
    planshetColor() {
      return !!this.$cookies.get('paveleon-planshet')
    },
    cTitle() {
      return this.$t('titles.YourChosenFlat')
    },
    buttonDisabled() {
      if (!this.flat) return true
      return this.flat.planshet.id !== this.$cookies.get('paveleon-planshet')
    },
    renderUrl() {
      if (!this.flat || !this.flat.render_url)
        return 'https://placehold.it/245x245'
      return this.flat.render_url
    },
    blueprintUrl() {
      if (!this.flat || !this.flat.blueprint_url)
        return 'https://placehold.it/245x245'
      return this.flat.blueprint_url
    },
    imageLabel() {
      if (!this.flat)
        return {
          ka: `საძინებელი`,
          en: `bedrooms`
        }
      return {
        ka: `${this.flat.bedrooms_count} საძინებელი`,
        en: `${this.flat.bedrooms_count} bedrooms`
      }
    },
    rooms() {
      if (!this.flat) return []
      return this.flat.rooms.map((item) => {
        return {
          label: item.name[this.locale],
          value: `${item.area} ${this.$t('labels.m2')}`
        }
      })
    },
    price() {
      if (!this.flat) return 0

      return this.flat.price
    },
    builingStatus() {
      if (!this.flat) return 0
      return parseInt(this.flat.building_status)
    },
    listCardData() {
      if (!this.flat) return
      const flatArea = (
        this.flat.total_area -
        this.flat.balcony_area -
        this.flat.terrace_area
      ).toFixed(2)
      return [
        {
          value: `${this.flat.total_area} ${this.$t('labels.m2')}`,
          label: this.$t('labels.total_area')
        },
        {
          value: `${flatArea} ${this.$t('labels.m2')}`,
          label: this.$t('labels.flat_area')
        },
        {
          value: `${this.flat.balcony_area} ${this.$t('labels.m2')}`,
          label: this.$t('labels.balcony_area_slash_terrace')
        }
      ]
    },
    flatLocationInfo() {
      if (!this.flat) return null

      return [
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
    }
  },
  mounted() {
    this.$axios.get(`/flats/${this.$route.params.id}`).then((response) => {
      this.flat = response.data.data
      if (this.$cookies.get('paveleon-planshet') !== this.flat.planshet.id) {
        this.setAlertData({
          show: true,
          text: this.generateTextBasedOnColor(this.flat.planshet.id),
          color: `#${this.flat.planshet.color}`
        })
      }
    })
  },
  beforeDestroy() {
    this.setAlertData({
      show: false,
      text: null,
      color: null
    })
  },
  methods: {
    ...mapMutations({
      setAlertData: 'Filter/SET_PROMPT_DATA'
    }),
    ...mapActions({
      lightUpFlat: 'Filter/lightUpFlat'
    }),
    handleLightUp() {
      this.lightUpFlat([this.flat])
    },
    generateTextBasedOnColor(id) {
      const planshetsObject = {
        1: this.$t('colors.orange'),
        2: this.$t('colors.purple'),
        3: this.$t('colors.blue'),
        4: this.$t('colors.green'),
        5: this.$t('colors.red'),
        6: this.$t('colors.yellow'),
        7: this.$t('colors.pink')
      }
      const planshetNumbers = {
        1: this.$t('colors.first'),
        2: this.$t('colors.second'),
        3: this.$t('colors.third'),
        4: this.$t('colors.fourth'),
        5: this.$t('colors.fifth'),
        6: this.$t('colors.sixth'),
        7: this.$t('colors.seventh')
      }
      return this.$t('alerts.planshetColorAlert')
        .replace('%s', planshetsObject[id])
        .replace('%n', planshetNumbers[id])
    }
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
    height: fit(562);
    display: flex;
    width: 100%;
    &__info {
      width: 199px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    &__render {
      width: 650px;
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

<style lang="scss">
.model-flat {
  .flat-view__image {
    height: 60%;
  }

  .price-label {
    margin-right: 15px !important;
  }

  .footer-items__controls__next {
    .btn-standard__text {
      padding-left: 15px !important;
    }
  }

  .list-slider__list__container {
    width: 90%;
  }
}
</style>
