<template>
  <div class="flat-pages-container">
    <title-with-line class="flat-pages-title" :title="title" />

    <flat-pages-slider
      :items="images"
      :price="price"
      class="flat-pages-content"
    >
      <template v-slot:slider-right-content>
        <slider-thumbnails
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

export default {
  components: {
    FlatPagesSlider,
    SliderThumbnails,
    TitleWithLine,
    GradientLabel,
    ButtonMainOrange,
    SkipButton,
    CaretRight
  },
  layout: 'SalesFilterLayout',
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
      decorations: 'customize/decorations'
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
      return this.getItems()
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
          return undefined
      }
    },
    thumbnailChanged(activeThumbnail) {
      this.activeThumbnail = activeThumbnail
    },
    nextBtnClickHandler() {
      this.$emit('next')

      this.$router.push(this.nextBtnUrl)
    }
  }
}
</script>

<style lang="scss" scoped>
.flat-pages-container {
  width: 100%;
  height: 100%;
  padding: fit(49) fit(60) fit(38) fit(46);
  display: grid;
  grid-template-areas: 'header header header' 'content content content' 'footer footer footer';
  grid-template-rows: 5% 82% 13%;

  .flat-pages-title {
    grid-area: header;
  }

  .flat-pages-content {
    grid-area: content;
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
