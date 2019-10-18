<template>
  <div class="flat-pages-container">
    <title-with-line class="flat-pages-title" :title="title" />

    <flat-pages-slider :items="images" :item-price="itemPrice" :price="price">
      <template v-slot:slider-right-content>
        <slider-thumbnails
          :items="items"
          @thumbnailChanged="thumbnailChanged"
        />
      </template>
    </flat-pages-slider>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FlatPagesSlider from '@/components/core/FlatPagesSlider'
import SliderThumbnails from '@/components/partials/SliderThumbnails'
import TitleWithLine from '@/components/partials/TitleWithLine'

export default {
  components: { FlatPagesSlider, SliderThumbnails, TitleWithLine },
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
  padding: fit(49) fit(60) fit(38) fit(46);
}
</style>
