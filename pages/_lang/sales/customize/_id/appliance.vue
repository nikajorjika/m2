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

      <div class="flat-pages-content">
        <ul v-if="items && items.length" class="slider-thumbnails">
          <li
            v-for="(item, index) in items"
            :key="item.id"
            :class="['slider-thumbnail', '' === index ? 'active' : '']"
            @click="selectItem(item, index, $event)"
          >
            <figure>
              <img :src="image(item, index)" class="image" alt="Thumbnail" />
            </figure>

            <div class="caption">{{ item.name[locale] }}</div>

            <div class="checkbox">
              <span></span>
            </div>
          </li>
        </ul>
      </div>

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
              <skip-button :url="skipBtnUrl" @skip="skipBtnClickHandler" />
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
    return {}
  },
  computed: {
    ...mapGetters({
      locale: 'locale',
      flat: 'customize/flat',
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
    price() {
      return this.flat.price
    },
    formattedPrice() {
      return `${this.$t('labels.price')} ${this.price} $`
    },
    items() {
      return this.appliances
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
    getNextPage() {
      return ''
    },
    skipBtnUrl() {
      return `/${this.locale}/sales/customize/${this.$route.params.id}/${this.getNextPage}`
    },
    nextBtnUrl() {
      return `/${this.locale}/sales/customize/${this.$route.params.id}/${this.getNextPage}`
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

    if (this.appliances === undefined || !this.appliances.length) {
      this.fetchAppliances()
    }
  },
  methods: {
    ...mapActions('customize', ['fetchFlat', 'fetchAppliances']),
    formatPrice,
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
      const ids = [...this.appliancesIds]

      if (ids.includes(id)) {
        ids.filter((val) => parseInt(val) === parseInt(id))
      } else {
        ids.push(id)
      }

      this.$store.commit('customize/SET_APPLIANCES_IDS', ids)
    },
    skipBtnClickHandler() {
      this.mutateStore([])
    },
    image(item, index) {
      return item.images && item.images[0]
        ? item.images[0].full_url
        : 'https://placehold.it/150x75'
    },
    selectItem(item, index, event) {
      // Set active class

      if (!event.target.classList.contains('active')) {
        event.target.classList.add('active')
      } else {
        event.target.classList.remove('active')
      }

      // Mutate store value

      this.mutateStore(item.id)

      // Emit custom event

      this.$emit('thumbnailChanged', index)
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
    width: calc(100% + 20px);
    height: fit(510);
    margin: auto auto 20px;
    padding-right: 20px;
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

.slider-thumbnails {
  display: grid;
  grid-template-columns:
    minmax(fit(400), 400px)
    minmax(fit(400), 400px)
    minmax(fit(400), 400px);
  grid-gap: fit(60) fit(114);
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
    width: 37.5%;
    height: 100%;
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
    position: relative;
    align-items: center;
    justify-content: center;
    width: 49.25%;
    font-size: 14px;
    line-height: 20px;
    text-align: right;
    color: #494949;
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
        border: solid #f26529;
        border-width: 0 2px 2px 0;
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
