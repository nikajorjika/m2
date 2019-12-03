<template>
  <div
    class="regular-btn"
    :style="{
      width: width,
      height: height,
      padding: padding,
      background: background,
      borderRadius: borderRadius
    }"
  >
    <div v-if="loading" class="loading" :style="loadingStyles">
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>

    <a
      :href="url"
      :style="{ color: labelColor }"
      :class="{ 'regular-btn__link': true, hide: loading }"
      @click.prevent="handleClick"
    >
      <span class="regular-btn__label">
        {{ label }}
      </span>

      <span class="regular-btn__icon" :style="{ marginLeft: iconMarginLeft }">
        <slot />
      </span>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: 'auto'
    },
    height: {
      type: String,
      default: '50px'
    },
    padding: {
      type: String,
      default: '0 30px'
    },
    background: {
      type: String,
      default: 'rgba(75, 63, 153, 0.7)'
    },
    borderRadius: {
      type: String,
      default: '25px'
    },
    url: {
      type: String,
      default: '#'
    },
    labelColor: {
      type: String,
      default: '#fff'
    },
    label: {
      type: String,
      default: ''
    },
    iconMarginLeft: {
      type: String,
      default: '30px'
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingStyles: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    handleClick() {
      if (!this.loading) {
        this.$emit('regularBtnClick')
      }
    }
  }
}
</script>

<style lang="scss">
.regular-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  justify-self: right;
  align-self: center;

  &__link {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    font-family: $font-caps;

    &.hide {
      visibility: hidden;
    }
  }

  &__label,
  &__icon {
    display: inline-flex;
  }
}

.loading {
  position: absolute;

  .lds-ellipsis {
    display: inline-block;
    position: relative;
    width: 35px;
    height: 23px;

    div {
      position: absolute;
      top: 10px;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #fff;
      animation-timing-function: cubic-bezier(0, 1, 1, 0);

      &:nth-child(1) {
        left: 4px;
        animation: lds-ellipsis1 0.6s infinite;
      }

      &:nth-child(2) {
        left: 5px;
        animation: lds-ellipsis2 0.6s infinite;
      }

      &:nth-child(3) {
        left: 17px;
        animation: lds-ellipsis2 0.6s infinite;
      }

      &:nth-child(4) {
        left: 27px;
        animation: lds-ellipsis3 0.6s infinite;
      }
    }
  }
}

@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
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

@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
</style>
