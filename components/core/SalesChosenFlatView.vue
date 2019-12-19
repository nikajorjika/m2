<template>
  <div class="flat-view">
    <div class="flat-view__header">
      <div class="flat-view__back-button" @click="handleBack">
        <span class="flat-view__back-button__icon">
          <caret-right width="10" height="12" icon-color="#432272" />
          <caret-right width="10" height="12" icon-color="#432272" />
        </span>

        <span>{{ $t('labels.back') }}</span>
      </div>

      <session-button class="sales-session-button" />

      <language-switcher class="flat-view__switcher" />
    </div>

    <slot />
  </div>
</template>

<script>
import SessionButton from '@/components/partials/SessionButton'
import LanguageSwitcher from '@/components/core/LanguageSwitcher'
import CaretRight from '@/components/icons/CaretRight'

export default {
  components: {
    CaretRight,
    LanguageSwitcher,
    SessionButton
  },
  methods: {
    handleBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.flat-view {
  display: flex;
  flex-direction: column;
  width: calc(100% - 99px);
  margin-left: auto;

  &__back-button {
    color: #3c2270;
    font-family: $font;
    font-size: 10px;
    display: flex;
    align-items: center;

    &__icon {
      svg {
        transform: rotate(180deg);

        &:last-child {
          margin-left: -9px;
        }
      }
    }
  }

  .sales-session-button {
    margin: auto 12px auto auto;
  }

  &__switcher {
    margin-right: 67px;
  }

  &__header {
    display: flex;
  }

  .faq-container {
    margin: auto 0;
  }
}
</style>
