<template>
  <div class="flat-pages-container">
    <title-with-line class="flat-pages-title" :title="title" />

    <flat-pages-slider
      :items="images"
      :item-price="itemPrice"
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
      <div class="price-button">
        <GradientButton v-if="price">
          {{ `${$t('labels.price')}: ${formatPrice(price)}` }} $
        </GradientButton>

        <GradientButton v-if="itemPrice">
          + {{ `${formatPrice(itemPrice)}` }} $
        </GradientButton>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FlatPagesSlider from '@/components/core/FlatPagesSlider'
import SliderThumbnails from '@/components/partials/SliderThumbnails'
import TitleWithLine from '@/components/partials/TitleWithLine'
import GradientButton from '@/components/core/GradientButton'
import { formatPrice } from '@/utils/Mixed'

export default {
  components: {
    FlatPagesSlider,
    SliderThumbnails,
    TitleWithLine,
    GradientButton
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
  grid-template-rows: 5% 87% 8%;

  .flat-pages-title {
    grid-area: header;
  }

  .flat-pages-content {
    grid-area: content;
  }

  .flat-pages-footer {
    grid-area: footer;

    .price-button {
      margin-top: 20px;

      button {
        font-size: 13px;
      }
    }
  }
}
</style>
