<template>
  <div class="btn btn-standard btn-standard--orange btn-standard--large">
    <span class="btn-standard__text">{{ buttonText }}</span>
    <span class="btn-standard__icon">
      <default-icon
        :icon-name="icon"
        :custom-styles="{
          backgroundImage: 'linear-gradient(0, #fff, #fff)',
          width: '9px',
          height: '13px'
        }"
      />
    </span>
  </div>
</template>

<script>
import DefaultIcon from '~/components/partials/DefaultIcon'

export default {
  components: { DefaultIcon },
  props: {
    buttonText: {
      type: String,
      default: 'შემდეგი'
    },
    icon: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  background-color: $action-primary-color;
  display: inline-block;
  color: #fff;
  height: 71px;
  width: 212px;
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
    width: 41px;
    height: 41px;
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
