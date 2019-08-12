<template>
  <div class="faq-button">
    <button-main-orange icon="arrow-right" :button-text="$t('buttons.faq')">
      <template v-slot:icon>
        <arrow-icon width="13" height="9" icon-color="#fff" />
      </template>
    </button-main-orange>
  </div>
</template>
<script>
import ButtonMainOrange from '../partials/ButtonMainOrange'
import ArrowIcon from '@/components/icons/ArrowRight'

export default {
  components: { ButtonMainOrange, ArrowIcon }
}
</script>
<style lang="scss" scoped>
.faq-button {
  width: auto;
  display: inline-block;
  margin: 41px 0;
}
</style>
