<template>
  <div class="flat-view">
    <div class="flat-view__header">
      <div class="flat-view__header__label">
        <gradient-label :text="bedroomCountLabel" class="label" />
      </div>
      <maximize-image :image="imageToMaximize" width="47px" height="47px" />
    </div>
    <div class="flat-view__image">
      <img v-if="!switchValue" :src="renderImage" />
      <img v-else :src="planImage" />
    </div>
    <div class="flat-view__footer">
      <slide-switch v-model="switchValue" class="switch" :values="switchData" />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import gradientLabel from '@/components/partials/GradientLabel'
import SlideSwitch from '@/components/partials/SlideSwitch'
import MaximizeImage from '@/components/partials/MaximizingImage'

export default {
  components: { gradientLabel, SlideSwitch, MaximizeImage },
  props: {
    renderImage: {
      type: String
    },
    planImage: {
      type: String
    },
    gradientText: {
      type: [Object, String]
    }
  },
  data() {
    return {
      switchValue: false,
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
  },
  computed: {
    ...mapGetters(['locale']),
    bedroomCountLabel() {
      return this.gradientText.hasOwnProperty(this.locale)
        ? this.gradientText[this.locale]
        : this.gradientText
    },
    imageToMaximize() {
      return !this.switchValue ? this.renderImage : this.planImage
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
    height: 223px;
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
