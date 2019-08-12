<template>
  <div class="faq-button">
    <button-main-orange icon="arrow-right">
      <template v-slot:icon>
        <arrow-icon width="13" height="9" icon-color="red" />
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
