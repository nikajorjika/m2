<template>
  <div class="faq-page">
    <faq-slider />
  </div>
</template>
<script>
import FaqSlider from '@/components/partials/FaqSlider'

export default {
  layout: 'Faq',
  components: { FaqSlider }
}
</script>

<style lang="scss">
.faq-page {
  height: 100%;
}
</style>
