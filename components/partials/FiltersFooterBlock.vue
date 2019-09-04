<template>
  <div class="filter-footer">
    <div class="filter-footer__flats">
      <div class="filter-footer__see"></div>
      <div class="filter-footer__label">
        <span>{{ $t('label.flats_based_on_filters') }}</span>
        <gradient-label :title="88" />
        <span>{{ $t('label.flat') }}</span>
      </div>
    </div>
    <div class="filter-footer__controls">
      <div class="filter-footer__controls__skip">{{ $t('buttons.skip') }}</div>
      <div class="filter-footer__controls__next">
        <button-main-orange :button-text="$t('buttons.next')">
          <template v-slot:icon>
            <arrow-right width="13" height="9" icon-color="#fff" />
          </template>
        </button-main-orange>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonMainOrange from '@/components/partials/ButtonMainOrange'
import ArrowRight from '@/components/icons/ArrowRight'
export default {
  components: { ButtonMainOrange, ArrowRight }
}
</script>

<style lang="scss" scoped>
.filter-footer {
  margin-top: auto;
  display: flex;
  &__controls {
    display: flex;
    margin-left: auto;
  }
}
</style>