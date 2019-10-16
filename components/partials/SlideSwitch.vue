<template>
  <div class="switch">
    <input v-model="value" type="checkbox" />
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
        v-for="(val, index) in values"
        :key="index"
        class="switch__inner__item"
        :style="{
          color: value === val.value ? activeColor : inactiveColor
        }"
      >
        {{ val.hasOwnProperty('label') ? val.label : '' }}
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
          value: false
        },
        {
          value: true
        }
      ]
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
      value: this.values[0].value
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
      font-weight: 800;
      letter-spacing: 2px;
      padding: 16px 37px 12px;
      border-radius: 38px;
      position: relative;
      z-index: 1;
      font-family: $font-caps;
    }
    &__toggle {
      background-color: rgb(242, 101, 41);
      position: absolute;
      height: calc(100% - 16px);
      width: calc(50% - 8px);
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
