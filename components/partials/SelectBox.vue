<template>
  <div class="select" :class="{ open: open }" @click.stop>
    <div class="select__current" @click="open = !open">
      <span v-if="!selectedValue">{{ placeholder }}</span>
      <span v-else class="selected">
        <span class="gray">
          {{ selected.label }}
        </span>
        <span>
          {{ selected.valueLabel }}
        </span>
      </span>
      <div class="arrow" :class="{ open: open }">
        <arrow-icon icon-color="#f26529" />
      </div>
    </div>
    <div v-if="open" class="select__options">
      <div
        v-for="(item, index) in cOptions"
        :key="index"
        class="select__options__option"
        @click="selectItem(item)"
      >
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
import ArrowIcon from '@/components/icons/CaretRight'
export default {
  components: {
    ArrowIcon
  },
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
      return this.options.map(({ value, indexLabel, valueLabel }) => {
        return {
          label: indexLabel,
          valueLabel,
          value
        }
      })
    }
  },
  mounted() {
    // eslint-disable-next-line nuxt/no-env-in-hooks
    if (process.client) {
      this.$root.$el.addEventListener('click', () => {
        this.open = false
      })
    }
  },
  destroyed() {
    this.$root.$el.removeEventListener('click', () => {
      this.open = false
    })
  },
  methods: {
    selectItem(item) {
      this.selectedValue = item.value
      this.open = false
      this.$emit('change', this.selectedValue)
    }
  }
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
    min-width: 62px;
  }
  &__current {
    padding: 15px 20px;
    display: flex;
    width: 180px;
    justify-content: space-between;
    position: relative;
    .arrow {
      position: absolute;
      top: 10px;
      right: 10px;
      svg {
        transform: rotate(90deg);
      }
      &.open {
        svg {
          transform: rotate(-90deg);
        }
      }
    }
  }
  &__options {
    padding: 15px 20px;
    display: flex;
    position: absolute;
    flex-direction: column;
    width: 180px;
    top: 100%;
    left: 0;
    z-index: 2;
    background: #f2d0ba;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    &__option {
      display: flex;
      padding: 12px 0;
      &:first-child {
        padding-top: 0;
      }
      &:last-child {
        padding-bottom: 0;
      }
    }
  }
}
</style>
