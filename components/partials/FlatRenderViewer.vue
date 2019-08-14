<template>
  <div class="flat-view">
    <div class="flat-view__header">
      <gradient-label text="2 საძინებელი" class="label" />
    </div>
    <div class="flat-view__image">
      <img src="https://placehold.it/240x240" alt="" />
    </div>
    <div class="flat-view__footer">
      <slide-switch v-model="renderImage" class="switch" :values="switchData" />
    </div>
  </div>
</template>
<script>
import gradientLabel from '@/components/partials/GradientLabel'
import SlideSwitch from '@/components/partials/SlideSwitch'

export default {
  components: { gradientLabel, SlideSwitch },
  data() {
    return {
      renderImage: false,
      switchData: [
        {
          label: this.$t('labels.Render'),
          value: 'render'
        },
        {
          label: this.$t('labels.Plan'),
          value: 'plan'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.flat-view {
  background: #fff;
  padding: 40px 18px 24px 32px;
  height: 100%;
  border-top-left-radius: 17px;
  border-bottom-left-radius: 17px;
  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 22px;
  }
  &__image {
    height: 394px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  &__footer {
    margin-top: 24px;
    display: flex;
    justify-content: center;
  }
}
</style>
