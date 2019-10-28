<template>
  <div class="app-content">
    <div class="flat-pages-container">
      <div class="flat-pages-header">
        <title-with-line class="flat-pages-title" :title="title" />

        <save-button
          :height="'40px'"
          :padding="'0 21px'"
          :label="$t('labels.saveFlat')"
          :icon-margin-left="'21px'"
          @regularBtnClick="saveFlat"
        >
          <template>
            <save-icon :width="'17px'" :height="'17px'" />
          </template>
        </save-button>
      </div>

      <flat-pages-slider
        :items="images"
        :price="price"
        class="flat-pages-content"
      >
        <template v-slot:slider-right-content>
          <slider-thumbnails
            v-if="items && items.length"
            :items="items"
            @thumbnailChanged="thumbnailChanged"
          />
        </template>
      </flat-pages-slider>

      <div class="flat-pages-footer">
        <div class="footer-items">
          <gradient-label
            v-if="price"
            :text="formattedPrice"
            class="price-label"
          />

          <gradient-label
            v-if="itemPrice"
            :text="formattedItemPrice"
            class="price-label"
          />

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
        <div class="sales">
          <illustrated-button
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
        />
      </template>
    </app-footer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FlatPagesSlider from '@/components/core/FlatPagesSlider'
import SliderThumbnails from '@/components/partials/SliderThumbnails'
import TitleWithLine from '@/components/partials/TitleWithLine'
import GradientLabel from '@/components/partials/GradientLabel'
import { formatPrice } from '@/utils/Mixed'
import ButtonMainOrange from '@/components/partials/ButtonMainOrange'
import SkipButton from '@/components/partials/SkipButton'
import CaretRight from '@/components/icons/CaretRight'
import AppFooter from '@/components/partials/AppFooter'
import PromptAlert from '@/components/partials/PromptAlert'
import IllustratedButton from '@/components/partials/IllustratedButton'
import ManagerIcon from '@/assets/icons/Manager1.svg'
import SalesIcon from '@/components/icons/Alone'
import SaveButton from '@/components/partials/RegularButton'
import SaveIcon from '@/components/icons/SaveIcon'

export default {
  components: {
    FlatPagesSlider,
    SliderThumbnails,
    TitleWithLine,
    GradientLabel,
    ButtonMainOrange,
    SkipButton,
    CaretRight,
    AppFooter,
    PromptAlert,
    IllustratedButton,
    ManagerIcon,
    SalesIcon,
    SaveButton,
    SaveIcon
  },
  layout: 'SalesFlatLayout',
  data() {
    return {
      activeThumbnail: 0
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
      appliancesIds: 'customize/appliancesIds'
    }),
    title() {
      const key =
        this.$route.params.page === 'makeover'
          ? 'renovation'
          : this.$route.params.page

      return this.$t('titles.FlatPagesTitle').replace(
        '%s',
        this.$t('navigation.' + key)
      )
    },
    price() {
      return this.flat.price
    },
    formattedPrice() {
      return `${this.$t('labels.price')} ${this.price} $`
    },
    items() {
      const items = this.getItems()

      if (items.length) {
        this.mutateStore(items[0].id)
      }

      return items
    },
    images() {
      const images = []
      const items = this.getItems()

      if (items) {
        items.forEach((item, index) => {
          if (this.activeThumbnail === index && item.images) {
            item.images.forEach((img) => {
              images.push({ image: { url: img.full_url } })
            })
          }
        })
      }

      return images
    },
    itemPrice() {
      let price = 0
      const items = this.getItems()

      if (items) {
        items.forEach((item, index) => {
          if (this.activeThumbnail === index && item.price) {
            price = item.price
          }
        })
      }

      return price
    },
    formattedItemPrice() {
      return `+ ${this.itemPrice} $`
    },
    getCurrentPage() {
      let page = ''

      if (this.$route.params.page) {
        switch (this.$route.params.page) {
          case 'makeover':
            page = 'furniture'
            break
          case 'furniture':
            page = 'decoration'
            break
          case 'decoration':
            page = 'appliance'
            break
        }
      }

      return page
    },
    skipBtnUrl() {
      return `/${this.locale}/sales/customize/${this.$route.params.id}/${this.getCurrentPage}`
    },
    nextBtnUrl() {
      return `/${this.locale}/sales/customize/${this.$route.params.id}/${this.getCurrentPage}`
    },
    flatExists() {
      return !!this.flat && Object.keys(this.flat).length
    },
    promptColor() {
      return this.flatExists ? '#' + this.flat.planshet.color : ''
    },
    promptText() {
      return this.flatExists
        ? this.generateTextBasedOnColor(this.flat.planshet.id)
        : ''
    },
    salesBtnLabel() {
      return this.$t('labels.callSaleManager')
    }
  },
  mounted() {
    if (this.flat === undefined || !this.flat.length) {
      this.fetchFlat(this.$route.params.id)
    }

    if (this.renovations === undefined || !this.renovations.length) {
      this.fetchRenovations()
    }

    if (this.furniture === undefined || !this.furniture.length) {
      this.fetchFurniture()
    }

    if (this.decorations === undefined || !this.decorations.length) {
      this.fetchDecorations()
    }
  },
  methods: {
    ...mapActions('customize', [
      'fetchFlat',
      'fetchRenovations',
      'fetchFurniture',
      'fetchDecorations'
    ]),
    formatPrice,
    getItems() {
      switch (this.$route.params.page) {
        case 'makeover':
          return this.renovations
        case 'furniture':
          return this.furniture
        case 'decoration':
          return this.decorations
        default:
          return []
      }
    },
    thumbnailChanged(activeThumbnail) {
      this.activeThumbnail = activeThumbnail
    },
    nextBtnClickHandler() {
      this.$emit('next')

      this.$router.push(this.nextBtnUrl)
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
    },
    summonSale() {
      return new Promise((resolve, reject) => {
        this.$axios
          .post('user/summon-sale', {
            flat_id: this.flat.id,
            planshet_id: this.flat.planshet.id
          })
          .then((response) => {
            if (response.status === 200) {
              resolve(response)
            }
          })
          .catch((e) => {
            reject(e)
          })
      })
    },
    saveFlat() {
      return new Promise((resolve, reject) => {
        this.$axios
          .post('user/save-flat', {
            flat_id: this.flat.id,
            renovation_id: this.renovationId,
            furniture_id: this.furnitureId,
            decoration_id: this.decorationId,
            appliances_ids: this.appliancesIds
          })
          .then((response) => {
            if (response.status === 200 && response.success) {
              resolve(response)
            }
          })
          .catch((e) => {
            reject(e)
          })
      })
    },
    mutateStore(id) {
      switch (this.$route.params.page) {
        case 'makeover':
          this.$store.commit('customize/SET_RENOVATION_ID', id)
          break
        case 'furniture':
          this.$store.commit('customize/SET_FURNITURE_ID', id)
          break
        case 'decoration':
          this.$store.commit('customize/SET_DECORATION_ID', id)
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.flat-pages-container {
  width: 100%;
  height: calc(100% - #{fit(165)});
  padding: fit(49) fit(60) fit(38) fit(46);
  display: grid;
  grid-template-areas: 'header header header' 'content content content' 'footer footer footer';
  grid-template-rows: 50px auto 50px;
  background: $bg-color-2;
  box-shadow: 0 7px 34.56px 1.44px rgba(242, 101, 41, 0.16);

  .flat-pages-header {
    grid-area: header;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .flat-pages-content {
    grid-area: content;
    margin-top: 6px;
  }

  .flat-pages-footer {
    grid-area: footer;
    display: flex;

    .footer-items {
      margin-top: auto;
      display: flex;
      justify-content: space-between;
      width: 100%;

      & > :first-child {
        margin-right: 15px !important;
      }

      .price-label {
        margin: auto 0;
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
</style>

<style lang="scss">
.app-content {
  width: 100%;
  height: 100%;
}

.app-footer {
  .sales {
    .button {
      width: auto;

      .label {
        margin: auto fit(28) auto fit(14);
      }
    }
  }
}

.flat-pages-container {
  .swiper__container {
    .swiper__pagination {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 15px;
    }

    .swiper__pagination__button {
      display: inline-flex;
      padding: 0;
      float: none;
    }
  }
}
</style>
