<template>
  <div class="faq-button" @click="handleClick">
    <button-main-orange icon="arrow-right" :button-text="$t('buttons.faq')">
      <template v-slot:icon>
        <arrow-right width="13" height="9" icon-color="#fff" />
      </template>
    </button-main-orange>
  </div>
</template>
<script>
import ButtonMainOrange from '@/components/partials/ButtonMainOrange'
import ArrowRight from '@/components/icons/ArrowRight'

export default {
  components: { ButtonMainOrange, ArrowRight },
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>
<style lang="scss" scoped>
.faq-button {
  width: auto;
  display: inline-block;
}
</style>
