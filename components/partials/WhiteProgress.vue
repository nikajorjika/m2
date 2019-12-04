<template>
  <div class="progress">
    <div class="progress__label">{{ label }}</div>
    <div class="progress__values">
      <div v-if="percentage >= 7" class="progress__values__min">{{ min }}</div>
      <div
        class="progress__values__value"
        :style="{ left: `${percentage ? percentage : 5}%` }"
      >
        {{ `${value}${suffix}` }}
      </div>
      <div v-if="percentage <= 93" class="progress__values__max">{{ max }}</div>
    </div>
    <div class="progress__bar">
      <div
        class="progress__bar__progress"
        :style="{ width: `${percentage}%` }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    value: {
      type: Number,
      default: 50
    },
    suffix: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    }
  },
  computed: {
    percentage() {
      return (this.value / (this.max - this.min)) * 100
    }
  }
}
</script>

<style lang="scss" scoped>
.progress {
  background: #ffffff;
  border-radius: 11px;
  font-size: 12px;
  padding: 12px;
  color: #494949;
  font-family: $font;
  &__values {
    display: flex;
    margin-top: 6px;
    position: relative;
    &__value {
      margin: 0 auto;
      position: absolute;
      transform: translateX(-50%);
      bottom: 0;
      left: 10%;
      transition: all 300ms ease;
    }
    &__max {
      margin-left: auto;
      margin-right: 5px;
    }
  }
  &__bar {
    background: #f2d0ba;
    height: 5px;
    border-radius: 3px;
    margin-top: 4px;
    overflow: hidden;
    position: relative;
    &__progress {
      background: $orange;
      opacity: 0.7;
      position: absolute;
      width: 58%;
      transition: all 300ms ease;
      top: 0;
      bottom: 0;
      left: 0;
    }
  }
}
</style>
