<template>
  <div class="select" :class="{open: open}">
    <div class="select__current" @click="open = !open">
      <span v-if="!selectedValue">{{placeholder}}</span>
      <span class="selected" v-else>
        <span class="gray">
          {{ selected.label }}
        </span>
        <span>
          {{ selected.valueLabel }}
        </span>
      </span>
    </div>
    <div v-if="open" class="select__options">
      <div v-for="(item, index) in cOptions" :key="index" class="select__options__option" @click="selectItem(item)">
        <span class="gray">
          {{ item.label }}
        </span>
        <span>
          {{ item.valueLabel }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: [Number, String],
      default: 'Select' 
    },
    options: {
      type: Array,
      default: () => []
    },
    preselected: {
      type: [Object, String, Number],
      default: null
    }
  },
  data() {
    return {
      selectedValue: this.preselected,
      open: false
    }
  },
  computed: {
    selected() {
      return this.cOptions.find((item) => {
        return item.value === this.selectedValue
      })
    },
    cOptions() {
      return this.options.map(({value, indexLabel, valueLabel}) => {
        return {
          label: indexLabel,
          valueLabel: valueLabel,
          value: value
        }
      })
    }
  },
  methods: {
    selectItem(item) {
      this.selectedValue = item.value
    }
  },
}
</script>

<style lang="scss" scoped>
.select {
  background: #f2d0ba;
  color: $orange;
  font-family: $font;
  display: inline-block;
  border-radius: 16px;
  position: relative;
  &.open {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  .selected {
    display: flex;
  }
  .gray {
    color: #494949;
    min-width: 70px;
  }
  &__current {
    padding: 15px 20px;
    display: flex;
    width: 180px;
  }
  &__options {
    padding: 15px 20px; 
    display: flex;  
    position: absolute;
    flex-direction: column;   
    width: 180px;
    top: 100%;
    left: 0;
    z-index: 99;
    background: #f2d0ba;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    &__option {
      display: flex;
    }
  }
}
</style>