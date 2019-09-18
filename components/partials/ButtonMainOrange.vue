<template>
  <div
    class="btn btn-standard btn-standard--orange btn-standard--large"
    :class="{ 'btn-standard--disabled': disabled }"
    @click="handleClick"
  >
    <span class="btn-standard__text" :style="{ fontSize: fontSize }">{{
      buttonText
    }}</span>
    <span
      class="btn-standard__icon"
      :style="{ width: iconWidth, height: iconHeight }"
    >
      <slot name="icon" />
    </span>
  </div>
</template>

<script>
export default {
  props: {
    buttonText: {
      type: String,
      default: 'შემდეგი'
    },
    iconWidth: {
      type: String,
      default: '28px'
    },
    iconHeight: {
      type: String,
      default: '28px'
    },
    fontSize: {
      type: String,
      default: '12px'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  background-color: $action-primary-color;
  display: inline-block;
  color: #fff;
  height: 47px;
  width: auto;
  display: flex;
}
.btn-standard {
  border-radius: 35px;
  &__text {
    @extend %buttons-main;
    flex: 1;
    justify-content: center;
    align-items: center;
    margin: auto;
    padding-left: 32px;
    font-weight: 900;
    letter-spacing: 2px;
  }
  &__icon {
    margin: auto 22px;
    border-radius: 50%;
    border: 1px #fff dashed;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &--disabled {
    opacity: 0.5;
  }
}
</style>
