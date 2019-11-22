<template>
  <div class="app-content">
    <div class="filter-flat">
      <div class="filter-flat__title">
        <title-with-line :title="cTitle" />
      </div>

      <div class="filter-flat__content">
        <div class="filter-flat__content__info">
          <flat-gradient-info :info="flatLocationInfo" />

          <list-card :items="listCardData" />

          <gradient-progress
            v-if="flatExists"
            class="filter-render__aside__progress"
            :label="$t('labels.building_progress')"
            :min="0"
            :max="100"
            :value="buildingStatus"
            suffix="%"
          />
        </div>

        <div class="filter-flat__content__render">
          <render-viewer
            v-if="flatExists"
            class="flat-viewer"
            :images="images"
            :gradient-text="imageLabel"
          />

          <room-list-component
            v-if="flatExists && rooms.length"
            class="room-list-slider"
            style-type="small"
            :room-list="rooms"
          />
        </div>
      </div>

      <div class="filter-flat__footer">
        <div class="footer-items">
          <price-container
            v-if="price"
            :price="price"
            :text-before-price="$t('labels.price')"
          />

          <currency-switcher v-if="flatExists" />

          <div class="footer-items__controls">
            <div class="footer-items__controls__skip">
              <skip-button :url="skipBtnUrl" />
            </div>

            <div class="footer-items__controls__next">
              <button-main-orange
                :button-text="$t('buttons.next')"
                @click="nextBtnClickHandler"
              >
                <template v-slot:icon>
                  <caret-right width="14" height="16" icon-color="#fff" />
                </template>
              </button-main-orange>
            </div>
          </div>
        </div>
      </div>
    </div>

    <app-footer>
      <template>
        <prompt-alert
          v-if="flatExists"
          :color="promptColor"
          :text="promptText"
        />
      </template>
    </app-footer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TitleWithLine from '@/components/partials/TitleWithLine'
import RenderViewer from '@/components/partials/FlatRenderViewerExtended'
import RoomListComponent from '@/components/partials/RoomListComponent'
import ListCard from '@/components/partials/ListCard'
import GradientProgress from '@/components/partials/GradientProgress'
import FlatGradientInfo from '@/components/partials/combinations/FlatGradientInfo'
import ButtonMainOrange from '@/components/partials/ButtonMainOrange'
import SkipButton from '@/components/partials/SkipButton'
import CaretRight from '@/components/icons/CaretRight'
import AppFooter from '@/components/partials/AppFooter'
import PromptAlert from '@/components/partials/PromptAlert'
import PriceContainer from '@/components/partials/Price'
import CurrencySwitcher from '@/components/partials/CurrencySwitcher'

export default {
  layout: 'SalesFlatLayout',
  auth: 'auth',
  middleware: 'isAuth',
  components: {
    TitleWithLine,
    RenderViewer,
    RoomListComponent,
    FlatGradientInfo,
    ListCard,
    GradientProgress,
    ButtonMainOrange,
    SkipButton,
    CaretRight,
    AppFooter,
    PromptAlert,
    PriceContainer,
    CurrencySwitcher
  },
  computed: {
    ...mapGetters({
      locale: 'locale',
      flat: 'customize/flat',
      renovations: 'customize/renovations',
      furniture: 'customize/furniture',
      decorations: 'customize/decorations',
      showPrompt: 'Filter/showPrompt'
    }),
    flatExists() {
      return !!this.flat && Object.keys(this.flat).length
    },
    cTitle() {
      let projectName = ''

      if (
        this.flatExists &&
        this.flat.project_name &&
        this.flat.project_name[this.locale]
      ) {
        projectName = ` <span class="color-orange">"${
          this.flat.project_name[this.locale]
        }"</span>`
      }

      return this.$t('titles.YourChosenFlat') + projectName
    },
    images() {
      const images = []
      const image = 'https://placehold.it/245x245'

      if (this.flatExists) {
        images.push(this.flat.render_url ? this.flat.render_url : image)
        images.push(this.flat.blueprint_url ? this.flat.blueprint_url : image)
        images.push(
          this.flat.floor && this.flat.floor.render_url
            ? this.flat.floor.render_url
            : image
        )
      }

      return images
    },
    imageLabel() {
      if (!this.flatExists)
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
      if (!this.flatExists) return []
      return this.flat.rooms.map((item) => {
        return {
          label: item.name[this.locale],
          value: `${item.area} ${this.$t('labels.m2')}`
        }
      })
    },
    price() {
      if (!this.flatExists) return 0
      return `${this.flat.price} $`
    },
    buildingStatus() {
      if (!this.flatExists) return 0
      return parseInt(this.flat.building_status)
    },
    listCardData() {
      if (!this.flatExists) return

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
      if (!this.flatExists) return null

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
    },
    skipBtnUrl() {
      return `/${this.locale}/sales/customize/${this.$route.params.id}/makeover`
    },
    promptColor() {
      return this.flatExists ? '#' + this.flat.planshet.color : ''
    },
    promptText() {
      return this.flatExists
        ? this.generateTextBasedOnColor(this.flat.planshet.id)
        : ''
    }
  },
  mounted() {
    this.fetchFlat(this.$route.params.id)

    this.$nextTick(function() {
      this.fetchRenovations()
      this.fetchFurniture()
      this.fetchDecorations()
      this.fetchAppliances()
    })
  },
  methods: {
    ...mapActions('customize', [
      'fetchFlat',
      'fetchRenovations',
      'fetchFurniture',
      'fetchDecorations',
      'fetchAppliances'
    ]),
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
    },
    nextBtnClickHandler() {
      this.$emit('next')

      this.$router.push(
        `/${this.locale}/sales/customize/${this.$route.params.id}/makeover`
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-flat {
  height: calc(100% - #{fit(165)});
  width: 100%;
  padding: fit(49) fit(60) fit(38) fit(46);
  display: grid;
  grid-template-areas: 'header header header' 'content content content' 'footer footer footer';
  grid-template-rows: 12% 75% 13%;
  background: $bg-color-2;
  box-shadow: 0 7px 34.56px 1.44px rgba(242, 101, 41, 0.16);

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
        width: fit(635);
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

      &__controls {
        display: flex;
        margin-left: auto;
        width: 264px;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}
</style>

<style lang="scss">
.app-content {
  width: 100%;
  height: 100%;

  .prompt {
    margin-top: auto;
  }
}
</style>
