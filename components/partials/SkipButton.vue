<template>
  <div class="skip-btn" @click="skipPage">
    <span v-text="btnLabel"></span>

    <span class="skip-btn-icon">
      <caret-right width="10" height="12" icon-color="#432272" />
      <caret-right width="10" height="12" icon-color="#432272" />
    </span>
  </div>
</template>

<script>
import CaretRight from '@/components/icons/CaretRight'

export default {
  components: { CaretRight },
  props: {
    label: {
      type: String,
      required: false,
      default: ''
    },
    url: {
      type: String,
      required: true
    }
  },
  computed: {
    btnLabel() {
      return this.label ? this.label : this.$t('buttons.skip')
    }
  },
  methods: {
    skipPage(e) {
      e.stopImmediatePropagation()

      if (this.url) {
        this.$router.push(this.url) // Go to next page
      }

      this.$emit('omit')
    }
  }
}
</script>

<style lang="scss">
.skip-btn {
  color: #432272;
  font-size: 10px;
  font: $font;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.skip-btn-icon {
  display: flex;

  svg {
    &:last-child {
      margin-left: -6px;
    }
  }
}
</style>
