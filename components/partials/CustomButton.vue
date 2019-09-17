<template>
  <button class="btn" :class="customClasses" @click="handleClick">
    <div class="btn__prefix">
      <slot name="iconLeft" />
    </div>
    <div class="btn__label">
      {{ label }}
    </div>
    <div class="btn__suffix">
      <slot name="icon" />
    </div>
  </button>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    buttonColor: {
      type: String,
      default: 'purple'
    },
    buttonSize: {
      type: String,
      default: 'medium'
    },
    disabled: {
      type: Boolean,
      default: false  
    }
  },
  computed: {
    customClasses() {
      const disabledClass = this.disabled ? 'btn--disabled' : ''
      return `btn--${this.buttonColor} btn--${this.buttonSize} ${disabledClass}`
    }
  },
  methods: {
    handleClick() {
      if (!this.disabled) {
        this.$emit('click')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  color: #fff;
  display: flex;
  border: none;
  border-radius: 16px;
  font-family: $font-caps;
  font-size: 10px;
  align-items: center;
  &:focus {
    outline: none;
  }
  &--disabled {
    opacity: 0.5;
  }
  &--purple {
    background: #7e73ae;
  }
  &--orange {
    background: #f26529;
  }
  &--medium {
    padding: 8px 22px;
  }
  &--small {
    padding: 8px 22px;
  }
  &--large {
    padding: 8px 22px;
  }
}
</style>
