<template>
  <div>
    <flat-pages-slider
      :items="items(renovations)"
      :item-price="itemPrice(renovations)"
      :price="123"
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

export default {
  components: { FlatPagesSlider, SliderThumbnails },
  layout: 'SalesFilterLayout',
  data() {
    return {
      activeThumbnail: 0
    }
  },
  computed: {
    ...mapGetters({
      locale: 'locale',
      renovations: 'customize/renovations',
      furniture: 'customize/furniture',
      decorations: 'customize/decorations'
    })
  },
  created() {
    if (this.renovations === undefined || !this.renovations.length) {
      this.$store.dispatch('customize/fetchRenovations')
    }
    if (this.furniture === undefined || !this.furniture.length) {
      this.$store.dispatch('customize/fetchFurniture')
    }

    if (this.decorations === undefined || !this.decorations.length) {
      this.$store.dispatch('customize/fetchDecorations')
    }
  },
  methods: {
    ...mapActions('customize', [
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
              images.push({ image: { url: img.url } })
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
