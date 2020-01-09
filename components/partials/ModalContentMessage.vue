<template>
  <div class="modal-content-message">
    <illustrated-button :label="msg" />
  </div>
</template>

<script>
import IllustratedButton from '@/components/partials/IllustratedButton'

export default {
  components: {
    IllustratedButton
  },
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  computed: {
    msg() {
      return this.data.hasOwnProperty('message') && this.data.message
        ? this.data.message
        : ''
    }
  }
}
</script>

<style lang="scss">
.layout-modal.modal-content-message {
  justify-content: center;
  width: fit(880) !important;
  height: fit(430) !important;
  padding: fit(138) fit(52) fit(120) !important;

  .button {
    width: fit(780);
    height: fit(122);
    padding-left: 0;
    border-radius: 30px;
    background-color: rgba(241, 216, 202, 0.32);

    .label {
      margin: auto;
      font-family: $font-caps;
      font-size: fit(24);
      letter-spacing: 1px;
      font-weight: bold;
      color: #494949;
    }

    .svg-container {
      display: none;
    }
  }
}
</style>
