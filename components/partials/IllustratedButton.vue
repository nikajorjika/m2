<template>
  <nuxt-link :to="toRoute" class="link">
    <div class="button">
      <slot name="illustration" />

      <span class="label">{{ label }}</span>

      <div class="svg-container">
        <slot name="icon" />
      </div>
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
    margin-left: fit(35, fitRaw(16)); /* 100px */
    font-family: $font;
    font-size: fit(18); /* 16px */
    line-height: fit(25, fitRaw(16)); /* 25px */
    color: $font-color;
  }

  .svg-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit(40); /* 40px */
    height: fit(40); /* 40px */
    margin: 0 fit(30) 0 auto; /* 30px */
    border-radius: 50%;
    background-color: $action-primary-color;
  }
}
</style>
