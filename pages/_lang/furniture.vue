<template>
  <div class="container">
    <SliderDesc :items="items" :price="price"/>
  </div>
</template>

<script>
import SliderDesc from '@/components/core/SliderDesc'
import { mapGetters } from 'vuex';
export default {
  components: {
    SliderDesc
  },
  computed: {
    ...mapGetters('Flats', ['flat']),
    items() {
      return this.flat.furniture.furniture_info
    },
    price() {
      const flat = this.flat.renovation_flat_properties.find((item) => {
        return item.type === 'area' && item.name === 'total_area'
      })
      return flat ? parseInt(this.flat.furniture.price) * parseInt(flat.number) : 0
    }
  }
}
</script>
