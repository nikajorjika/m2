<template>
  <div class="container">
    <SliderDesc :items="items" :price="price" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SliderDesc from '@/components/core/SliderDesc'
export default {
  components: {
    SliderDesc
  },
  layout: 'RenovationsLayout',
  middleware: 'chosenFlat',
  computed: {
    ...mapGetters('Flats', ['flat']),
    items() {
      return this.flat.furniture.furniture_info
    },
    price() {
      const flat = this.flat.renovation_flat_properties.find((item) => {
        return item.type === 'area' && item.name === 'total_area'
      })
      return flat
        ? parseInt(this.flat.furniture.price) * parseInt(flat.number)
        : 0
    }
  }
}
</script>
