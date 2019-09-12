<template>
  <nuxt-link :to="toRoute" class="link">
    <div class="button">
      <slot name="illustration"></slot>

      <span class="label">{{ label }}</span>

      <slot name="icon"></slot>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    toRoute: {
      type: [String, Object],
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.link {
  text-decoration: none;
}

.button {
  display: flex;
  align-items: center;
  width: fit(470); /* 470px */
  height: fit(90); /* 90px */
  background-color: rgba(242, 101, 41, 0.15);
  border-radius: 28px;

  .label {
    margin-left: fit(100, fitRaw(16)); /* 100px */
    font-family: $font;
    font-size: fit(16); /* 16px */
    line-height: fit(25, fitRaw(16)); /* 25px */
    color: $font-color;
  }
}
</style>
