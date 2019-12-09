<template>
  <gradient-block>
    <div class="block-info">
      <div class="block-info__number">
        <div class="block-info__number__label">{{ cTopLabel }}</div>
        <div class="block-info__number__value">{{ blockNumber }}</div>
      </div>
      <div v-if="displayBottomBlock" class="block-info__flats">
        <div>{{ cBottomLabel }}</div>
        <div>{{ flatsLeft }}</div>
      </div>
      <div v-if="displayButton" class="block-info__button">
        <button-main-orange
          class="button"
          icon="arrow-right"
          :button-text="$t('buttons.see')"
          icon-width="20px"
          icon-height="20px"
          font-size="10px"
          @click="handleClick"
        >
          <template v-slot:icon>
            <arrow-right width="13" height="9" icon-color="#fff" />
          </template>
        </button-main-orange>
      </div>
    </div>
  </gradient-block>
</template>

<script>
import ButtonMainOrange from '@/components/partials/ButtonMainOrange'
import GradientBlock from '@/components/partials/GradientBlock'
import ArrowRight from '@/components/icons/ArrowRight'
export default {
  components: { GradientBlock, ButtonMainOrange, ArrowRight },
  props: {
    blockNumber: {
      type: [String, Number],
      required: true
    },
    flatsCount: {
      type: [String, Number],
      required: true
    },
    topLabel: {
      type: [String, Number],
      default: null
    },
    bottomLabel: {
      type: [String, Number],
      default: null
    },
    displayBottomBlock: {
      type: Boolean,
      default: true
    },
    displayButton: {
      type: Boolean,
      default: true
    },
  },
  computed: {
    flatsLeft() {
      return `${this.flatsCount} ${this.$t('labels.flat')}`
    },
    cBottomLabel() {
      return this.bottomLabel ? this.bottomLabel : this.$t('labels.FlatsLeftInThisBlock') 
    },
    cTopLabel() {
      return this.topLabel ? this.topLabel : this.$t('labels.block')
    }
  },
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.block-info {
  font-size: 12px;
  font-family: $font;
  font-weight: 200;
  letter-spacing: 0.6px;
  line-height: 1.6;
  text-align: center;
  width: 155.05px;
  display: flex;
  flex-direction: column;
  &__number {
    display: flex;
    border: 1px solid #fff;
    border-radius: 35px;
    width: auto;
    margin: 0 auto 21px;
    &__label {
      padding: 20px 0 20px 8px;
    }
    &__value {
      height: 40px;
      width: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #fff;
      border-radius: 50%;
      margin: auto 10px;
    }
  }
  &__flats {
    margin-bottom: 21px;
  }
  &__button {
    width: 83%;
    margin: 0 auto;
    .button {
      height: 31px;
    }
  }
}
</style>
