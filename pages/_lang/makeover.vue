<template>
  <div class="container">
    <SliderDesc :items="items" />
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
      return this.flat.renovation.renovation_info
    }
  }
}
</script>
