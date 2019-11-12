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
    <a
      :href="url"
      :style="{ color: labelColor }"
      class="regular-btn__link"
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
    }
  },
  methods: {
    handleClick() {
      this.$emit('regularBtnClick')
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
  }

  &__label,
  &__icon {
    display: inline-flex;
  }
}
</style>
