<template>
  <div class="container">
    <SliderDesc :items="items" />
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
      return this.flat.renovation.renovation_info
    }
  }
}
</script>
