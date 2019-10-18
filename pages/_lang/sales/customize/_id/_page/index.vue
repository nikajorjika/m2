<template>
  <div class="flat-pages-container">
    <title-with-line class="flat-pages-title" :title="title" />

    <flat-pages-slider
      :items="items(renovations)"
      :item-price="itemPrice(renovations)"
      :price="price"
    >
      <template v-slot:slider-right-content>
        <slider-thumbnails
          :items="renovations"
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
    }
  },
  created() {
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
    items(renovations) {
      const images = []

      if (renovations) {
        renovations.forEach((renovation, index) => {
          if (this.activeThumbnail === index && renovation.images) {
            renovation.images.forEach((img) => {
              images.push({ image: { url: img.full_url } })
            })
          }
        })
      }

      return images
    },
    itemPrice(renovations) {
      let price = 0

      if (renovations) {
        renovations.forEach((renovation, index) => {
          if (this.activeThumbnail === index && renovation.price) {
            price = renovation.price
          }
        })
      }

      return price
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
