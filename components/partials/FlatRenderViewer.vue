<template>
  <div class="flat-view">
    <div class="flat-view__header">
      <div class="flat-view__header__label">
        <gradient-label text="2 საძინებელი" class="label" />
      </div>
      <maximize-image
        image="https://via.placeholder.com/240x240"
        width="47px"
        height="47px"
      />
    </div>
    <div class="flat-view__image">
      <img
        v-if="!renderImage"
        src="https://via.placeholder.com/240x240"
        alt=""
      />
      <img v-else src="https://via.placeholder.com/250x240" alt="" />
    </div>
    <div class="flat-view__footer">
      <slide-switch v-model="renderImage" class="switch" :values="switchData" />
    </div>
  </div>
</template>
<script>
import gradientLabel from '@/components/partials/GradientLabel'
import SlideSwitch from '@/components/partials/SlideSwitch'
import MaximizeImage from '@/components/partials/MaximizingImage'

export default {
  components: { gradientLabel, SlideSwitch, MaximizeImage },
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
  padding: 27px 17px 16px 22px;
  height: 100%;
  border-top-left-radius: 17px;
  border-bottom-left-radius: 17px;
  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
  }
  &__image {
    height: 261px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  &__footer {
    margin-top: 16px;
    display: flex;
    justify-content: center;
  }
}
</style>
