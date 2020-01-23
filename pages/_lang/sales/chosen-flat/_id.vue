<template>
  <div class="app-content chosen-flat">
    <confirm-email-modal
      v-if="confirmModalShow"
      :preset="user.email"
      :loading="confirmModalLoading"
      @accept="sendToEmail"
      @closed="confirmModalShow = false"
    />
    <div class="gradient-line"></div>
    <div class="filter-flat">
      <div class="filter-flat__title">
        <title-with-line :title="cTitle" />

        <button-main-orange
          v-if="flatExists"
          :button-text="$t('labels.DetailsAsPdf')"
          :text-padding="'0 0 0 12px'"
          @click="sendPdf"
        >
          <template v-slot:icon>
            <pdf-icon height="14px" width="14px" fill="#fff" />
          </template>
        </button-main-orange>
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
          <div class="text-sliders-container">
            <TextSlider
              v-if="flatExists && flatConfigsData.length"
              :items="flatConfigsData"
              :slick-options="slickOptions1"
            />

            <TextSlider
              v-if="flatExists && flatAppliances.length"
              id="appliances-slider"
              :items="flatAppliances"
              :slick-options="slickOptions2"
              :swipe-icon="swipeIconVisibility"
            />
          </div>

          <div class="price-container">
            <price-container
              v-if="flatExists && currencyRate"
              :price="price"
              :text-before-price="$t('labels.price')"
            />

            <currency-switcher v-if="flatExists" />
          </div>
        </div>
      </div>
    </div>

    <app-footer>
      <template>
        <div class="sales">
          <button-main-orange
            v-if="flatExists"
            :button-text="$t('buttons.callSalesManager')"
            :text-padding="'0 0 0 12px'"
            @click.native.prevent="summonSale"
          >
            <template v-slot:icon>
              <sells width="14" height="16" icon-color="#fff" />
            </template>
          </button-main-orange>

          <button-main-orange
            v-if="flatExists"
            :button-text="$t('buttons.reservationRequest')"
            :text-padding="'0 0 0 12px'"
            @click.native.prevent="reserveFlat"
          >
            <template v-slot:icon>
              <light width="14" height="16" icon-color="#fff" />
            </template>
          </button-main-orange>
        </div>

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
import AppFooter from '@/components/partials/AppFooter'
import PromptAlert from '@/components/partials/PromptAlert'
import PriceContainer from '@/components/partials/Price'
import CurrencySwitcher from '@/components/partials/CurrencySwitcher'
import TextSlider from '@/components/partials/TextSlider'
import ButtonMainOrange from '@/components/partials/ButtonMainOrange'
import Sells from '@/components/icons/Sells'
import Light from '@/components/icons/Light'
import PdfIcon from '@/assets/icons/PdfIcon.svg'
import ConfirmEmailModal from '@/components/partials/modals/ConfirmEmailAddress'

export default {
  layout: 'SalesChosenFlatLayout',
  middleware: 'isAuth',
  components: {
    TitleWithLine,
    RenderViewer,
    RoomListComponent,
    FlatGradientInfo,
    ListCard,
    GradientProgress,
    AppFooter,
    PromptAlert,
    PriceContainer,
    CurrencySwitcher,
    TextSlider,
    ButtonMainOrange,
    Sells,
    Light,
    ConfirmEmailModal,
    PdfIcon
  },
  data() {
    return {
      confirmModalShow: false,
      confirmModalLoading: false,
      showSwipeIcon: false,
      intervalHandle: null,
      textSliderTrack: false,
      slickOptions1: {
        slidesToShow: 3,
        slidesToScroll: 1,
        variableWidth: true,
        arrows: false,
        infinite: false
      },
      slickOptions2: {
        // slidesToShow: 5,
        // slidesToScroll: 3,
        variableWidth: true,
        arrows: false,
        infinite: false
      }
    }
  },
  computed: {
    ...mapGetters({
      locale: 'locale',
      currencyRate: 'settings/currencyRate',
      chosenFlat: 'chosen-flat/chosenFlat',
      flat: 'chosen-flat/flat',
      user: 'auth/user',
      renovation: 'chosen-flat/renovation',
      furniture: 'chosen-flat/furniture',
      decoration: 'chosen-flat/decoration',
      appliances: 'chosen-flat/appliances'
    }),
    flatExists() {
      return !!this.flat && Object.keys(this.flat).length
    },
    cTitle() {
      let projectName = ''

      if (this.flatExists && this.flat.project_name) {
        const name = JSON.parse(this.flat.project_name)

        if (name[this.locale]) {
          projectName = ` <span class="color-orange">"${
            name[this.locale]
          }"</span>`
        }
      }

      return this.$t('titles.YourChosenFlat') + projectName
    },
    images() {
      const images = []
      const image = 'https://placehold.it/245x245'

      if (this.flatExists) {
        images.push(
          this.flat.render_full_url ? this.flat.render_full_url : image
        )
        images.push(
          this.flat.blueprint_full_url ? this.flat.blueprint_full_url : image
        )
        images.push(
          this.flat && this.flat.floor_render_full_url
            ? this.flat.floor_render_full_url
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
        ka: `${this.flat.bedroom_count} საძინებელი`,
        en: `${this.flat.bedroom_count} bedrooms`
      }
    },
    rooms() {
      if (!this.flatExists) return []

      return this.flat.flat_rooms.map((item) => {
        return {
          label: item.name[this.locale],
          value: `${item.area} ${this.$t('labels.m2')}`
        }
      })
    },
    price() {
      let price = 0

      if (this.flatExists) {
        price += parseFloat(this.flat.price)

        if (this.appliances && this.appliances.length) {
          this.appliances.forEach((appliance) => {
            if (appliance.price) {
              price += parseFloat(appliance.price)
            }
          })
        }
      }

      return `${price} $`
    },
    buildingStatus() {
      if (!this.flatExists) return 0

      return this.flat.building_progress
        ? parseInt(this.flat.building_progress)
        : 0
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
          value: this.flat.block_number
        },
        {
          label: this.$t('labels.floor'),
          value: this.flat.floor_number
        },
        {
          label: this.$t('labels.flat'),
          value: this.flat.flat_number
        }
      ]
    },
    promptColor() {
      return this.flatExists ? '#' + this.flat.planshet.color : ''
    },
    promptText() {
      return this.flatExists
        ? this.generateTextBasedOnColor(this.flat.planshet.id)
        : ''
    },
    flatConfigsData() {
      const configs = []

      if (
        this.renovation &&
        this.renovation.name &&
        this.renovation.name.hasOwnProperty(this.locale)
      ) {
        configs.push(
          `${this.$t('labels.Renovation')}: ${
            this.renovation.name[this.locale]
          }`
        )
      }

      if (
        this.furniture &&
        this.furniture.name &&
        this.furniture.name.hasOwnProperty(this.locale)
      ) {
        configs.push(
          `${this.$t('labels.furniture')}: ${this.furniture.name[this.locale]}`
        )
      }

      if (
        this.decoration &&
        this.decoration.name &&
        this.decoration.name.hasOwnProperty(this.locale)
      ) {
        configs.push(
          `${this.$t('labels.decoration')}: ${
            this.decoration.name[this.locale]
          }`
        )
      }

      return configs
    },
    flatAppliances() {
      const appliances = []

      if (this.appliances) {
        Array.from(this.appliances).map((appliance, index) => {
          if (appliance.name && appliance.name.hasOwnProperty(this.locale)) {
            if (index === 0) {
              appliances.push(
                `${this.$t('labels.chosenAppliances')}: ${
                  appliance.name[this.locale]
                }`
              )
            } else {
              appliances.push(appliance.name[this.locale])
            }
          }
        })
      }

      return appliances
    },
    modalData() {
      return {
        location: {
          name: 'lang-sales-waiting',
          params: { lang: this.locale }
        },
        flat: this.flat ? this.flat.id : null,
        renovation_id: this.renovation ? this.renovation.id : null,
        furniture_id: this.furniture ? this.renovation.id : null,
        decoration_id: this.decoration ? this.renovation.id : null,
        appliances_ids: this.appliances ? this.renovation.id : null
      }
    },
    swipeIconVisibility() {
      return this.showSwipeIcon
    },
    modalMessage() {
      return {
        message: this.$t('modal.sentSuccessfully')
      }
    }
  },
  watch: {
    textSliderTrack(newVal, oldVal) {
      if (oldVal !== newVal) {
        clearInterval(this.intervalHandle)
      }
    }
  },
  mounted() {
    this.getChosenFlat(this.$route.params.id)

    const that = this

    this.intervalHandle = setInterval(
      () => {
        that.textSliderTrack = that.displaySwipeIcon()
      },
      500,
      that
    )
  },
  methods: {
    ...mapActions('chosen-flat', ['getChosenFlat']),
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
    },
    reserveFlat() {
      this.$axios
        .post('/flats/reserve', {
          flat_id: this.$route.params.id
        })
        .then((response) => {
          // Check if flat is reserved successfully

          if (response.data.status) {
            // Open modal and display success message

            this.$eventBus.$emit('openModal', 'modal-content-message', {
              message: this.$t('modal.successfulReservation')
            })
          } else {
            // Open modal and display fail message

            this.$eventBus.$emit('openModal', 'modal-content-message', {
              message: this.$t('modal.failedReservation')
            })
          }
        })
    },
    sendPdf() {
      this.confirmModalShow = true
    },
    sendToEmail(email) {
      this.confirmModalLoading = true
      this.$axios
        .get(`/user-flats/${this.chosenFlat.id}/send-pdf`, {
          params: {
            email,
            locale: this.locale
          }
        })
        .then(() => {
          this.confirmModalShow = false
          this.confirmModalLoading = false

          this.$eventBus.$emit(
            'openModal',
            'modal-content-message',
            this.modalMessage
          )
        })
        .catch(() => {
          this.confirmModalLoading = false
        })
    },
    displaySwipeIcon() {
      const container = document.getElementById('appliances-slider')

      if (container) {
        const els = container.getElementsByClassName('slick-track')
        const el = els.length !== 0 ? els[0] : null

        if (el && container.clientWidth < el.clientWidth) {
          this.showSwipeIcon = true
        }

        return el !== null
      } else {
        clearInterval(this.intervalHandle)
      }

      return container !== null
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-flat {
  display: grid;
  grid-template-areas: 'header header header' 'content content content' 'footer footer footer';
  grid-template-rows: fit(90) fit(502) auto;
  width: 100%;
  height: calc(100% - #{fit(155)});
  padding: fit(60) 0 0 fit(70);

  &__title {
    grid-area: header;
  }

  &__content {
    display: flex;
    grid-area: content;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding-right: fit(95);

    &__info {
      width: fit(299);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    &__render {
      width: fit(1000);
      margin-left: auto;
      display: flex;

      .room-list-slider {
        width: fit(461);
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
    align-items: center;
    margin: 15px 0;
    overflow: hidden;

    .footer-items {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 100%;

      .text-sliders-container {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        width: 100%;
        max-width: 100%;
        margin: auto 0;
        height: 66%;
        overflow: hidden;

        .text-slider-container {
          display: flex;
          justify-self: auto;
          margin: auto 0;
        }
      }

      .price-container {
        display: flex;
        width: 100%;
      }
    }
  }
}

.app-content {
  width: 100%;
  height: 100%;
  border-top-left-radius: 6px;
  background: $bg-color-2;
  box-shadow: 0 7px 34.56px 1.44px rgba(242, 101, 41, 0.16);
  overflow: hidden;

  .gradient-line {
    height: 6px;
    background: linear-gradient(45deg, #f26529 0%, #f6a646 100%);
  }

  .filter-flat__title {
    display: flex;
    justify-content: space-between;
    padding-right: fit(95);

    .btn {
      align-self: flex-end;
      position: relative;
      top: calc(-50% + 7px);

      .btn-standard__icon {
        margin: -4px 8px auto 10px;
        border: none;
      }
    }
  }

  .app-footer {
    align-items: initial;
    padding-left: fit(70);

    .sales {
      display: flex;
      align-items: flex-start;
    }

    .btn {
      margin-top: fit(36);

      &:first-child {
        margin-right: 15px;
      }

      .btn-standard__icon {
        margin: auto 8px auto 14px;
      }
    }
  }

  .prompt {
    margin-top: fit(40);
  }
}
</style>

<style lang="scss">
.chosen-flat {
  .switch__inner__item {
    letter-spacing: 0 !important;
  }

  .list-slider__list {
    padding: 25px 30px 17px !important;
  }

  .list-slider__list__item__label {
    white-space: nowrap;
  }

  .list-card__item--white {
    padding: 13px 12px 12px;
  }
}
</style>
