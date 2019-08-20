<template>
  <div class="btn btn-standard btn-standard--orange btn-standard--large">
    <span class="btn-standard__text">{{ buttonText }}</span>
    <span class="btn-standard__icon">
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
    }
  },
  data() {
    return {
      inactiveStyles: {
        backgroundImage:
          'linear-gradient(0,rgba(255,255,255, 1),rgba(255,255,255, 1) 100%)',
        width: '9px',
        height: '13px'
      }
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
  }
  &__icon {
    width: 28px;
    height: 28px;
    margin: auto 22px;
    border-radius: 50%;
    border: 1px #fff dashed;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
