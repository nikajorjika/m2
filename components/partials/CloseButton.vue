<template>
  <div class="faq-button">
    <button-main-orange icon="arrow-right" :button-text="buttonText">
      <template v-slot:icon>
        <close-icon width="13" height="9" icon-color="#fff" />
      </template>
    </button-main-orange>
  </div>
</template>
<script>
import ButtonMainOrange from '@/components/partials/ButtonMainOrange'
import CloseIcon from '@/components/icons/Close'

export default {
  components: { ButtonMainOrange, CloseIcon },
  props: {
    buttonText: {
      type: String,
      required: true
    }
  },
  methods: {
    onClick() {
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
