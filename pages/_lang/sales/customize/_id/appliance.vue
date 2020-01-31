<template>
  <div class="app-content">
    <div class="flat-pages-container">
      <div class="flat-pages-header">
        <title-with-line :title="title" class="flat-pages-title" />

        <h3 class="flat-pages-subtitle">
          <warning-icon :width="16" :height="16" :icon-color="'#f26529'" />

          {{ subtitle }}
        </h3>

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
            <save-icon :width="'17px'" :height="'17px'" />
          </template>
        </save-button>
      </div>

      <div class="flat-pages-content">
        <ul
          v-if="flatExists && items && items.length"
          class="slider-thumbnails"
        >
          <li
            v-for="(item, index) in items"
            :key="item.id"
            :data-id="item.id"
            :class="['slider-thumbnail', '' === index ? 'active' : '']"
            @click="selectItem(item, index, $event)"
          >
            <figure>
              <img :src="image(item)" class="image" alt="Thumbnail" />
            </figure>

            <div class="caption">
              <span>{{ item.name[locale] }}</span>
              <!-- <span class="price" -->
              <!--  >{{ $currencyConverter(item.price, currency) }} -->
              <!--   {{ currencyLabel }} </span -->
              <!-- >-->
            </div>

            <div class="checkbox">
              <span />
            </div>
          </li>
        </ul>
      </div>

      <div class="flat-pages-footer">
        <div class="footer-items">
          <!--          <price-container-->
          <!--            v-if="price && rate"-->
          <!--            :price="price"-->
          <!--            :text-before-price="$t('labels.price')"-->
          <!--          />-->

          <!--          <price-container-->
          <!--            v-if="additionalPrice && showAdditionals"-->
          <!--            :price="additionalPrice"-->
          <!--          />-->

          <!--          <currency-switcher v-if="flatExists" />-->

          <div class="footer-items__controls">
            <div class="footer-items__controls__skip">
              <skip-button :url="skipBtnUrl" @omit="skipBtnClickHandler" />
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
            v-if="flatExists && canSummon"
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
          class="appliances__prompt"
        />
      </template>
    </app-footer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TitleWithLine from '@/components/partials/TitleWithLine'
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
import WarningIcon from '@/components/icons/Warning'
// import PriceContainer from '@/components/partials/Price'
// import CurrencySwitcher from '@/components/partials/CurrencySwitcher'

export default {
  components: {
    TitleWithLine,
    ButtonMainOrange,
    SkipButton,
    CaretRight,
    AppFooter,
    PromptAlert,
    IllustratedButton,
    ManagerIcon,
    SalesIcon,
    SaveButton,
    SaveIcon,
    WarningIcon
    // PriceContainer,
    // CurrencySwitcher
  },
  layout: 'SalesFlatLayout',
  middleware: 'isAuth',
  data() {
    return {
      // showAdditionals: true,
      saveFlatBtnLoading: false,
      saveFlatBtnMsgShow: false,
      planshetId: this.$cookies.get('paveleon-planshet')
    }
  },
  computed: {
    ...mapGetters({
      locale: 'locale',
      flat: 'customize/flat',
      currency: 'settings/currency',
      rate: 'settings/currencyRate',
      appliances: 'customize/appliances',
      renovationId: 'customize/renovationId',
      furnitureId: 'customize/furnitureId',
      decorationId: 'customize/decorationId',
      appliancesIds: 'customize/appliancesIds'
    }),
    title() {
      return this.$t('titles.FlatPagesTitle').replace(
        '%s',
        this.$t('navigation.appliance')
      )
    },
    canSummon() {
      return this.$cookies.get('paveleon-planshet')
    },
    price() {
      return this.flat.price
    },
    formattedPrice() {
      return `${this.$t('labels.price')} ${this.price} $`
    },
    items() {
      return this.appliances
    },
    currencyLabel() {
      return this.currency === 'GEL' ? '₾' : '$'
    },
    itemPrice() {
      let price = 0
      const items = this.appliances

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
    skipBtnUrl() {
      return `/${this.locale}/sales/chosen-flat/${this.$route.params.id}`
    },
    nextBtnUrl() {
      return `/${this.locale}/sales/chosen-flat/${this.$route.params.id}`
    },
    flatExists() {
      return !!this.flat && Object.keys(this.flat).length
    },
    promptColor() {
      return this.flatExists ? this.flat.planshet.color : ''
    },
    promptText() {
      return this.flatExists
        ? this.generateTextBasedOnColor(this.flat.planshet.id)
        : ''
    },
    salesBtnLabel() {
      return this.$t('labels.callSaleManager')
    },
    subtitle() {
      return this.$t('titles.flatPagesSubtitle').replace(
        '%s',
        this.locale === 'ka'
          ? this.$t('navigation.appliance').replace('ა', 'ი')
          : this.$t('navigation.appliance')
      )
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
    },
    saveFlatBtnLabel() {
      return !this.saveFlatBtnMsgShow
        ? this.$t('labels.saveFlat')
        : this.$t('buttons.saved')
    }
    // additionalPrice() {
    //   let price = 0
    //   this.appliances.map((item) => {
    //     if (this.appliancesIds.includes(item.id)) {
    //       price += item.price
    //     }
    //   })
    //   return price
    // }
  },
  // watch: {
  //   additionalPrice: {
  //     handler() {
  //       this.showAdditionals = false
  //       this.$nextTick(() => (this.showAdditionals = true))
  //     }
  //   }
  // },
  mounted() {
    this.$root.$on('saveFlat', this.saveFlat)

    if (this.flat === undefined || !this.flat.length) {
      this.fetchFlat(this.$route.params.id)
    }

    if (this.appliances === undefined || !this.appliances.length) {
      this.fetchAppliances()
    }

    this.selectAppliances()
  },
  beforeDestroy() {
    this.$root.$off('saveFlat')
  },
  methods: {
    ...mapActions('customize', ['fetchFlat', 'fetchAppliances']),
    formatPrice,
    nextBtnClickHandler() {
      this.$router.push({
        path: this.nextBtnUrl,
        query: { redirect: 0 }
      })
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
    mutateStore(id) {
      let ids = [...this.appliancesIds]

      if (id === null) {
        ids = []
      } else if (ids.includes(id)) {
        ids = ids.filter((val) => parseInt(val) !== parseInt(id))
      } else {
        ids.push(id)
      }

      this.$store.commit('customize/SET_APPLIANCES_IDS', ids)
    },
    skipBtnClickHandler() {
      this.mutateStore(null)
    },
    image(item) {
      return item.images && item.images[0]
        ? item.images[0].full_url
        : 'https://placehold.it/150x75'
    },
    selectItem(item, index, event) {
      // Set active class
      const parent = event.target.closest('.slider-thumbnail')

      if (!parent.classList.contains('active')) {
        parent.classList.add('active')
      } else {
        parent.classList.remove('active')
      }

      // Mutate store value

      this.mutateStore(item.id)
    },
    selectAppliances() {
      // Select appliances which are stored in the state

      if (this.appliancesIds !== undefined && this.appliancesIds.length) {
        const items = document.querySelectorAll(
          '.flat-pages-content .slider-thumbnail'
        )

        items.forEach((item) => {
          if (
            this.appliancesIds.includes(parseInt(item.getAttribute('data-id')))
          ) {
            item.classList.add('active')
          } else {
            item.classList.remove('active')
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.appliances__prompt {
  margin-top: auto;
}
.flat-pages-container {
  width: 100%;
  height: calc(100% - #{fit(165)});
  padding: fit(49) fit(60) fit(38) fit(46);
  display: grid;
  grid-template-areas: 'header header header' 'content content content' 'footer footer footer';
  grid-template-rows: 50px auto 50px;
  background: $bg-color-2;
  // box-shadow: 0 7px 34.56px 1.44px rgba(242, 101, 41, 0.16);

  .flat-pages-header {
    grid-area: header;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: relative;

    .flat-pages-subtitle {
      position: absolute;
      top: 100%;
      left: 0;
      font: 14px/1 $font;
      color: #f26529;
    }

    svg {
      vertical-align: bottom;
    }
  }

  .flat-pages-content {
    grid-area: content;
    width: calc(100% + 25px);
    height: fit(360);
    margin: auto auto auto -10px;
    padding: 4px 15px 4px 10px;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 8px;
    }

    /* Track */

    &::-webkit-scrollbar-track {
      width: 8px;
      border-radius: 10px;
      background: #f2cab1;
    }

    /* Handle */

    &::-webkit-scrollbar-thumb {
      width: 2px;
      border-radius: 4px;
      background: #f2a27b;
    }

    /* Handle on hover */

    &::-webkit-scrollbar-thumb:hover {
      background: #f26529;
    }
  }

  .flat-pages-footer {
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

.slider-thumbnails {
  display: grid;
  grid-template-columns:
    minmax(fit(400), 400px)
    minmax(fit(400), 400px)
    minmax(fit(400), 400px);
  grid-gap: fit(60) fit(104);
  padding: 0;
}

.slider-thumbnail {
  display: flex;
  align-items: center;
  height: fit(130);
  border-top-left-radius: 25px;
  border-bottom-right-radius: 25px;
  background-color: #ffffff;
  overflow: hidden;
  transition: all 200ms ease;

  figure {
    display: flex;
    justify-content: center;
    position: relative;
    top: 0;
    width: 37.5%;
    height: calc(100% + 2px);
    padding: 12px;
    background-color: #f2cab1;
  }

  .image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  .caption {
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    justify-content: center;
    width: 49.25%;
    font-size: 14px;
    line-height: 20px;
    text-align: left;
    padding-left: 18px;
    color: #494949;
    span {
      margin-right: auto;
    }
    .price {
      color: $orange;
      text-align: left;
      margin-top: 5px;
    }
  }

  .checkbox {
    visibility: hidden;
    display: flex;
    justify-content: center;
    width: 14.25%;

    span {
      display: block;
      position: relative;
      width: fit(37);
      height: fit(37);
      border: 1px dotted #f26529;
      border-radius: 8px;

      &::after {
        content: '';
        position: absolute;
        top: 4px;
        left: 9px;
        z-index: 1;
        width: 6px;
        height: 12px;
        border-right-width: 2px;
        border-bottom-width: 2px;
        border-right-style: solid;
        border-bottom-style: solid;
        border-color: #f26529;
        transform: rotate(45deg);
      }
    }
  }

  &.active {
    box-shadow: 0 4px 32px rgba(242, 101, 41, 0.1);
    transform: scale(1.06, 1.05);

    .checkbox {
      visibility: visible;
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
    display: flex;
    align-items: center;

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
