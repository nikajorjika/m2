<template>
  <div class="select-range">
    <div class="select-range__selected">
      <div class="select-range__selected__min">{{ chosenMin }}</div>
      <div class="select-range__selected__max">{{ chosenMax }}</div>
    </div>
    <div class="select-range__slider--dashed">
      <div
        id="select-range__noUiSlider"
        class="select-range__slider__inner"
      ></div>
    </div>
    <div class="select-range__preset">
      <div class="select-range__preset__min">
        {{ minLabel }}
      </div>
      <div class="select-range__preset__max">
        {{ maxLabel }}
      </div>
    </div>
  </div>
</template>

<script>
import noUiSlider from 'nouislider'
import { formatPrice } from '@/utils/Mixed'
export default {
  props: {
    minValue: {
      type: [Number, String],
      default: 0
    },
    maxValue: {
      type: [Number, String],
      default: 100000
    },
    suffix: {
      type: String,
      default: '$'
    },
    presetMin: {
      type: [Number, String],
      default: null
    },
    presetMax: {
      type: [Number, String],
      default: null
    },
    step: {
      type: [Number, String],
      default: 1
    }
  },
  data() {
    return {
      selectedMin: this.minValue,
      selectedMax: this.maxValue,
      slider: null,
      sliderObject: null
    }
  },
  computed: {
    chosenMin() {
      return `${this.formatPrice(this.selectedMin, '.')} ${this.suffix}`
    },
    chosenMax() {
      return `${this.formatPrice(this.selectedMax, '.')} ${this.suffix}`
    },
    minLabel() {
      return `${this.$t('labels.min')} ${this.formatPrice(this.minValue)} ${
        this.suffix
      }`
    },
    maxLabel() {
      return `${this.$t('labels.max')} ${this.formatPrice(this.maxValue)} ${
        this.suffix
      }`
    }
  },
  mounted() {
    this.slider = document.getElementById('select-range__noUiSlider')
    this.sliderObject = noUiSlider.create(this.slider, {
      range: {
        min: this.minValue,
        max: this.maxValue
      },
      step: this.step,
      connect: true,
      start: [this.presetMin || this.minValue, this.presetMax || this.maxValue]
    })
    this.sliderObject.on('update', this.updateMinMax)
  },
  methods: {
    formatPrice,
    updateMinMax(data) {
      this.selectedMin = data[0].split('.')[0]
      this.selectedMax = data[1].split('.')[0]
      this.$emit('change', { min: this.selectedMin, max: this.selectedMax })
    }
  }
}
</script>

<style lang="scss" scoped>
.select-range {
  background: transparent;
  border-radius: 17px;
  overflow: hidden;
  padding: 47px 7px;
  font-family: $font;
  &__selected {
    display: flex;
    justify-content: space-between;
    color: #f26529;
    margin-bottom: 13px;
    &__min {
      padding: 12px 0;
      border-radius: 10px;
    }
    &__max {
      padding: 12px 0;
      border-radius: 10px;
    }
  }
  &__slider {
    height: 16px;
    position: relative;
    margin-top: 20px;
    &__inner {
      height: 7px;
      border: none;
    }
  }
  &__preset {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    color: #605e5c;
    font-size: 13px;
  }
}
</style>
<style lang="scss">
.select-range__slider--dashed {
  .noUi-connect {
    background: $orange;
  }
  .noUi-horizontal {
    background: transparent;
    height: 2px;
    border: 1px dashed $orange;
    .noUi-base {
      height: 4px;
      transform: translateY(-2px);
      opacity: 1;
      .noUi-handle {
        right: -7px;
        top: -6px;
      }
    }
  }
  .noUi-base {
    .noUi-handle {
      border: none;
      height: 15px;
      width: 15px;
      border-radius: 5px;
      overflow: hidden;
      &:before,
      &:after {
        content: none;
      }
    }
    .noUi-touch-area {
      background: #f26529;
    }
  }
}
</style>
