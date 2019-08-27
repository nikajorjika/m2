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
    items(){
      return this.flat.decoration.decoration_info
    },
    price() {
      const flat = this.flat.renovation_flat_properties.find((item) => {
        return item.type === 'area' && item.name === 'flat'
      })
      return flat ? this.flat.decoration.price * flat.number : 0
    }
  },
  methods: {}
}
</script>
