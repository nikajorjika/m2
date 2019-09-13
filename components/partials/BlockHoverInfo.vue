<template>
  <gradient-block>
    <div class="block-info">
      <div class="block-info__number">
        <div class="block-info__number__label">ბლოკი</div>
        <div class="block-info__number__value">11</div>
      </div>
      <div class="block-info__flats">
        <div>ამ ბლოკში დარჩენილია</div>
        <div>14 ბინა</div>
      </div>
      <div class="block-info__button">
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
  &__number {
    display: flex;
    border: 1px solid #fff;
    border-radius: 35px;
    width: 71%;
    margin: 0 auto 21px;
    &__label {
      padding: 20px 0 20px 8px;
    }
    &__value {
      padding: 11px;
      border: 1px solid #fff;
      border-radius: 50%;
      margin: auto;
    }
  }
  &__flats {
    margin-bottom: 21px;
  }
  &__button{
    width: 83%;
    margin: 0 auto;
    .button {
      height: 31px;
    }
  }
}
</style>