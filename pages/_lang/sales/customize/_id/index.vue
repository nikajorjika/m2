<template>
  <div class="app-content">
    <div class="filter-flat">
      <div class="filter-flat__title">
        <title-with-line :title="cTitle" />

        <save-button
          v-if="flatExists"
          :loading="saveFlatBtnLoading"
          :height="'40px'"
          :padding="'0 21px'"
          :label="saveFlatBtnLabel"
          :icon-margin-left="'21px'"
          @regularBtnClick="saveFlat"
        >
          <template>
            <save-icon width="17px" height="17px" color="#fff" />
          </template>
        </save-button>
      </div>

      <div class="filter-flat__content">
        <div class="filter-flat__content__info">
          <flat-gradient-info :info="flatLocationInfo" />

          <list-card :items="listCardData" />

          <gradient-progress
            v-if="flatExists"
            :label="$t('labels.building_progress')"
            :min="0"
            :max="100"
            :value="buildingStatus"
            class="filter-render__aside__progress"
            suffix="%"
          />
        </div>

        <div class="filter-flat__content__render">
          <render-viewer
            v-if="flatExists"
            :images="images"
            :gradient-text="imageLabel"
            class="flat-viewer"
          />

          <room-list-component
            v-if="flatExists && rooms.length"
            :room-list="rooms"
            :visible-rooms-number="7"
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

          <currency-switcher v-if="flatExists" />

          <div class="footer-items__controls">
            <!-- <div class="footer-items__controls__skip">
              <skip-button :url="skipBtnUrl" />
            </div> -->

            <div class="footer-items__controls__next">
              <button-main-orange
                :button-text="$t('buttons.next')"
                text-padding="0 15px 0 32px"
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
        <div v-if="canSummon" class="sales">
          <illustrated-button
            v-if="flatExists"
            :label="salesBtnLabel"
            @click.native.prevent="summonSale"
          >
            <template v-slot:illustration>
              <manager-icon
                :width="53"
                :height="80"
                :style="{ marginTop: '-20px' }"
              />
            </template>

            <template v-slot:icon>
              <sales-icon width="12" height="12" fill="#fff" />
            </template>
          </illustrated-button>
        </div>

        <prompt-alert
          v-if="flatExists"
          :color="promptColor"
          :text="promptText"
          class="margin-top-auto"
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
// import SkipButton from '@/components/partials/SkipButton'
import CaretRight from '@/components/icons/CaretRight'
import AppFooter from '@/components/partials/AppFooter'
import PromptAlert from '@/components/partials/PromptAlert'
import PriceContainer from '@/components/partials/Price'
import CurrencySwitcher from '@/components/partials/CurrencySwitcher'
import SaveButton from '@/components/partials/RegularButton'
import SaveIcon from '@/components/icons/SaveIcon'
import IllustratedButton from '@/components/partials/IllustratedButton'
import ManagerIcon from '@/assets/icons/Manager1.svg'
import SalesIcon from '@/components/icons/Alone'

export default {
  layout: 'SalesFlatLayout',
  middleware: 'isAuth',
  components: {
    TitleWithLine,
    RenderViewer,
    RoomListComponent,
    FlatGradientInfo,
    ListCard,
    GradientProgress,
    ButtonMainOrange,
    // SkipButton,
    CaretRight,
    AppFooter,
    PromptAlert,
    PriceContainer,
    CurrencySwitcher,
    SaveButton,
    SaveIcon,
    IllustratedButton,
    ManagerIcon,
    SalesIcon
  },
  data() {
    return {
      prevFlatId: null,
      saveFlatBtnLoading: false,
      saveFlatBtnMsgShow: false
    }
  },
  computed: {
    ...mapGetters({
      locale: 'locale',
      flat: 'customize/flat',
      renovations: 'customize/renovations',
      furniture: 'customize/furniture',
      decorations: 'customize/decorations',
      renovationId: 'customize/renovationId',
      furnitureId: 'customize/furnitureId',
      decorationId: 'customize/decorationId',
      appliancesIds: 'customize/appliancesIds',
      rate: 'settings/currencyRate',
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
          this.flat && this.flat.floor_render_full_url
            ? this.flat.floor_render_full_url
            : image
        )
      }

      return images
    },
    canSummon() {
      return this.$cookies.get('paveleon-planshet')
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
      return this.flat.price
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
          label: this.$t('titles.total_area')
        },
        {
          value: `${flatArea} ${this.$t('labels.m2')}`,
          label: this.$t('titles.flat_area')
        },
        {
          value: `${this.flat.balcony_area} ${this.$t('labels.m2')}`,
          label: this.$t('titles.balcony_area_slash_terrace')
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
      return this.flatExists ? this.flat.planshet.color : ''
    },
    promptText() {
      return this.flatExists
        ? this.generateTextBasedOnColor(this.flat.planshet.id)
        : ''
    },
    saveFlatBtnLabel() {
      return !this.saveFlatBtnMsgShow
        ? this.$t('labels.saveFlat')
        : this.$t('buttons.saved')
    },
    salesBtnLabel() {
      return this.$t('labels.callSaleManager')
    },
    modalData() {
      return {
        location: {
          name: 'lang-sales-waiting',
          params: { lang: this.locale }
        },
        flat: this.flat ? this.flat.id : null,
        renovation_id: this.renovationId,
        furniture_id: this.furnitureId,
        decoration_id: this.decorationId,
        appliances_ids: this.appliancesIds
      }
    }
  },
  mounted() {
    this.prevFlatId = this.flat.id

    this.$root.$on('saveFlat', this.saveFlat)

    this.fetchFlat(this.$route.params.id)

    this.$nextTick(function() {
      this.fetchRenovations()
      this.fetchFurniture()
      this.fetchDecorations()
      this.fetchAppliances()
    })
  },
  updated() {
    if (this.prevFlatId && this.prevFlatId !== this.flat.id) {
      this.mutateStore()
    }
  },
  beforeDestroy() {
    this.$root.$off('saveFlat')
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
    },
    mutateStore() {
      this.$store.commit('customize/SET_RENOVATION_ID', null)
      this.$store.commit('customize/SET_FURNITURE_ID', null)
      this.$store.commit('customize/SET_DECORATION_ID', null)
      this.$store.commit('customize/SET_APPLIANCES_IDS', [])
    },
    saveFlat() {
      this.saveFlatBtnLoading = true
      const data = {
        flat_id: this.flat ? this.flat.id : null,
        renovation_id: this.renovationId,
        furniture_id: this.furnitureId,
        decoration_id: this.decorationId,
        appliances_ids: this.appliancesIds
      }

      // Reset flat configurations

      this.$store.commit('customize/SET_CONFIGURATIONS', [])

      return new Promise((resolve, reject) => {
        this.$axios
          .post('user/save-flat', data)
          .then((response) => {
            if (response.status === 200 && response.data.success) {
              this.saveFlatBtnLoading = false
              this.saveFlatBtnMsgShow = true

              setTimeout(() => {
                this.saveFlatBtnMsgShow = false
              }, 3000)

              // Store flat configurations

              this.$store.commit('customize/SET_CONFIGURATIONS', data)
            } else {
              this.saveFlatBtnLoading = false
            }

            resolve(response)
          })
          .catch((e) => {
            this.saveFlatBtnLoading = false

            reject(e)
          })
      })
    },
    summonSale() {
      this.$axios.get('/user/awaiting-status').then((response) => {
        // Check if sales manager is already called

        if (!response.data.status) {
          // Open modal

          this.$eventBus.$emit(
            'openModal',
            'modal-content-call-sales',
            this.modalData
          )
        } else {
          // Go to waiting page

          this.$router.push({
            name: 'lang-sales-waiting',
            params: { lang: this.locale }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-flat {
  width: 100%;
  height: calc(100% - #{fit(165)});
  padding: fit(49) fit(60) fit(38) fit(46);
  display: grid;
  grid-template-areas: 'header header header' 'content content content' 'footer footer footer';
  grid-template-rows: 50px auto 50px;
  background: $bg-color-2;
  box-shadow: 0 7px 34.56px 1.44px rgba(242, 101, 41, 0.16);

  &__title {
    grid-area: header;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  &__content {
    grid-area: content;
    display: flex;
    align-self: center;
    width: 100%;
    // height: fit(510);
    height: 358px;
    margin: auto;
    overflow: auto;

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

      &__controls__next {
        margin-left: auto;
      }

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
.margin-top-auto {
  margin-top: auto !important;
}
</style>

<style lang="scss">
.app-content {
  width: 100%;
  height: 100%;
}
</style>
