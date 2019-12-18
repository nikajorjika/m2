<template>
  <div class="checkbox" @click="handleCheck">
    <span>{{ label }}</span>
    <span v-if="checked" class="icon-container">
      <check
        class="icon-checkbox"
        height="9px"
        width="7px"
        icon-color="#f26529"
      />
    </span>
  </div>
</template>

<script>
import Check from '@/components/icons/Check'

export default {
  components: {
    Check
  },
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Object, Array],
      default: ''
    },
    label: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleCheck() {
      this.$emit('check', this.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.checkbox {
  padding: 9px 13px;
  font-size: 11px;
  color: #676766;
  font-family: $font;
  border-radius: 12px;
  border: 1px dashed #f26529;
  width: 171px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .icon-container {
    border: 1px solid #f26529;
    border-radius: 6px;
    display: flex;
    height: 17px;
    width: 17px;
  }
  .icon-checkbox {
    margin: auto;
  }
}
</style>
