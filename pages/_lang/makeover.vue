<template>
  <div class="container">
    <SliderDesc :items="items" />
  </div>
</template>

<script>
import SliderDesc from '@/components/core/SliderDesc'
export default {
  components: {
    SliderDesc
  },
  asyncData({ store }) {
    return {
      items: store.getters['Flats/flat'].renovation.renovation_info
    }
  },

  methods: {}
}
</script>
