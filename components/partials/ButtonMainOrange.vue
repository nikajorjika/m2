<template>
  <button
    :class="{ 'btn-standard--disabled': disabled || loading }"
    :style="buttonCustomStyles"
    class="btn btn-standard btn-standard--orange btn-standard--large"
    @click="handleClick"
  >
    <div v-if="loading" :style="textCustomStyles" class="loading">
      <div class=" lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <span v-else :style="textCustomStyles" class="btn-standard__text">
      <span class="center-font">{{ buttonText }}</span>
    </span>
    <span :style="iconCustomStyles" class="btn-standard__icon">
      <slot name="icon" />
    </span>
  </button>
</template>

<script>
export default {
  props: {
    buttonText: {
      type: [String, Number],
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
    buttonCustomStyles: {
      type: Object,
      default: () => ({})
    },
    iconStyles: {
      type: Object,
      default: () => ({})
    },
    textStyles: {
      type: Object,
      default: () => ({})
    },
    fontSize: {
      type: String,
      default: '12px'
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    textPadding: {
      type: String,
      default: '0 0 0 32px'
    }
  },
  computed: {
    textCustomStyles() {
      return {
        fontSize: this.fontSize,
        padding: this.textPadding,
        ...this.textStyles
      }
    },
    iconCustomStyles() {
      return {
        width: this.iconWidth,
        height: this.iconHeight,
        ...this.iconStyles
      }
    }
  },
  methods: {
    handleClick() {
      if (!this.loading && !this.disabled) {
        this.$emit('click')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  background-color: $action-primary-color;
  color: #fff;
  height: 47px;
  width: auto;
  display: flex;
  border: none;
  outline: none;
}
.btn-standard {
  border-radius: 35px;
  &__text {
    @extend %buttons-main;
    flex: 1;
    justify-content: center;
    align-items: center;
    margin: auto;
    font-weight: 900;
    letter-spacing: 1px;
  }
  &__icon {
    margin: 0 5px 0 8px;
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
.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 23px;
  height: 23px;
}
.lds-ellipsis div {
  position: absolute;
  top: 10px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #fff;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 4px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 5px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 17px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 27px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(10px, 0);
  }
}
</style>
