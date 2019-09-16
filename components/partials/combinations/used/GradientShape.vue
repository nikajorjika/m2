<template>
  <div class="label">
    <div class="label__number">
      {{ value }}
    </div>
    <div class="label__name">
      {{ label }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: 0
    },
    label: {
      type: String,
      default: 'label'
    }
  }
}
</script>

<style lang="scss" scoped>
.label {
  background: linear-gradient(
    to bottom,
    rgba(226, 100, 121, 0.7) 0%,
    rgba(104, 79, 120, 0.7) 100%
  );
  color: #fff;
  border-radius: 30px;
  padding-top: 6.6px;
  width: 60px;
  font-size: 10px;
  &__number {
    height: 48px;
    width: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #fff;
    border-radius: 50%;
    margin: auto;
    margin-bottom: 12px;
  }
  &__name {
    padding-bottom: 30px;
    text-align: center;
    font-family: $font;
  }
}
</style>
