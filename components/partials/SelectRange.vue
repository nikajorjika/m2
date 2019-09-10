<template>
  <div class="select-range">
    <div class="select-range__selected">
      <div class="select-range__selected__min">{{ chosenMin }}</div>
      <div class="select-range__selected__max">{{ chosenMax }}</div>
    </div>
    <div class="select-range__slider">
      <div id="select-range__noUiSlider" class="select-range__slider__inner"></div>
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
import { formatPrice } from '@/utils/Mixed'
import noUiSlider from 'noUiSlider'
export default {
  props: {
    minValue: {
      type: Number,
      default: 0
    },
    maxValue: {
      type: Number,
      default: 100000
    },
    suffix: {
      type: String,
      default: '$'
    }
  },
  mounted() {
    this.slider = document.getElementById('select-range__noUiSlider')
    this.sliderObject = noUiSlider.create(this.slider,{
      range: {
        'min': this.minValue,
        'max': this.maxValue
      },
      connect: true,
      start: [this.minValue, this.maxValue],
    })
    this.sliderObject.on('update', this.updateMinMax)
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
      return `${this.$t('labels.min')} ${this.formatPrice(this.minValue)} ${this.suffix}`
    },
    maxLabel() {
      return `${this.$t('labels.max')} ${this.formatPrice(this.maxValue)} ${this.suffix}`
    }
  },
  methods: {
    formatPrice,
    updateMinMax(data) {
      this.selectedMin = data[0].split('.')[0]
      this.selectedMax = data[1].split('.')[0]
    }
  }
}
</script>

<style lang="scss" scoped>
.select-range {
  background: #f6ece1;
  border-radius: 17px;
  overflow: hidden;
  padding: 47px 57px;
  font-family: $font;
  &__selected {
    display: flex;
    justify-content: space-between;
    color: #f26529;
    &__min {
      background: #fbf6f0;
      padding: 12px 27px;
      border-radius: 10px;
    }
    &__max {
      background: #fbf6f0;
      padding: 12px 27px;
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
    font-size: 12px;
  }
}
</style>
<style lang="scss">
.select-range__slider {
  .noUi-connect {
    background:  linear-gradient(60deg, #684f78 0%, #e26479 100%);
    opacity: 0.7;
  }
  .noUi-horizontal {
    .noUi-base {
      .noUi-handle {
          right: -7px;
          top: -4px;
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