<template>
  <div class="switch">
    <input v-model="value" type="checbox" />
    <div
      class="switch__inner"
      :class="{ active: value === values[1].value }"
      :style="{ backgroundColor: bgColor }"
      @click="updateInput()"
    >
      <div
        class="switch__inner__toggle"
        :style="{ backgroundColor: btnColor }"
        :class="{ active: value === values[1].value }"
      />
      <div
        class="switch__inner__item"
        :style="{
          color: value === values[0].value ? activeColor : inactiveColor
        }"
      >
        {{ values[0].label }}
      </div>
      <div
        class="switch__inner__item"
        :style="{
          color: value === values[1].value ? activeColor : inactiveColor
        }"
      >
        {{ values[1].label }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    values: {
      type: [Array],
      default: () => [
        {
          label: 'one',
          value: 'one'
        },
        {
          label: 'two',
          value: 'two'
        }
      ]
    },
    presetValue: {
      type: [Boolean],
      default: false
    },
    bgColor: {
      type: [String],
      default: '#f2652926'
    },
    btnColor: {
      type: [String],
      default: '#f26529'
    },
    inactiveColor: {
      type: [String],
      default: '#f26529'
    },
    activeColor: {
      type: [String],
      default: '#ffffff'
    }
  },
  data() {
    return {
      value: this.presetValue || this.values[0].value
    }
  },
  methods: {
    updateInput() {
      const result = this.value === this.values[0].value
      this.value = result ? this.values[1].value : this.values[0].value
      this.$emit('input', result)
    }
  }
}
</script>
<style lang="scss">
.switch {
  display: flex;
  overflow: hidden;
  input {
    display: none;
  }
  &__inner {
    display: flex;
    padding: 8px;
    border-radius: 38px;
    position: relative;
    &__item {
      font-size: 11px;
      padding: 14px 37px;
      border-radius: 38px;
      position: relative;
      z-index: 1;
      font-family: $font-caps;
    }
    &__toggle {
      background-color: rgb(242, 101, 41);
      position: absolute;
      height: calc(100% - 16px);
      width: calc(50% - 12px);
      z-index: 0;
      border-radius: 38px;
      top: 8px;
      left: 8px;
      transition: left 0.2s;
      &.active {
        left: 50%;
      }
    }
  }
}
</style>
