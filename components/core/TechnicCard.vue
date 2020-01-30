<template>
  <div class="card">
    <div
      :style="{ backgroundImage: 'url(' + imageUrl + ')' }"
      class="card__image"
    ></div>
    <div class="card__content">
      <div class="card__title card__title--red">
        {{ item.name.hasOwnProperty(locale) ? item.name[locale] : '' }}
      </div>
      <div class="card__text">
        {{
          item.description.hasOwnProperty(locale)
            ? item.description[locale]
            : ''
        }}
      </div>
      <div class="card__button">
        <GradientButton
          >{{ $t('labels.appliancePrice') }}: {{ item.price }} $</GradientButton
        >
      </div>
    </div>
    <div class="card__maximaze-item">
      <maximize-image
        :image="imageUrl"
        width="47px"
        height="47px"
        icon-color="#fff"
        bg-color="#f16529"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GradientButton from '@/components/core/GradientButton'
import MaximizeImage from '@/components/partials/MaximizingImage'
export default {
  components: {
    GradientButton,
    MaximizeImage
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(['locale']),
    imageUrl() {
      if (this.$route.name === 'lang-renovations-appliance') {
        return this.item.hasOwnProperty('images') && this.item.images.length
          ? this.item.images[0].full_url
          : ''
      }

      return this.item.image ? this.item.image.url : ''
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  border-radius: 30px 0;
  overflow: hidden;
  &__image {
    width: 100%;
    padding-top: 69.69%;
    background-size: contain;
    background-repeat: no-repeat;
    background-color: #ffffff;
    background-position: center center;
  }
  &__content {
    padding: fit(40) 25px fit(30);
    background: #f9f1e9;
  }

  &__title {
    font-family: $font-caps;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: fit(30, 18);
    max-height: 34px;
    padding-top: 2px;
    overflow: hidden;
    &--red {
      color: #f49b73;
    }
  }
  &__text {
    font-family: $font;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 15px;
    color: #595959;
    height: 80px;
    overflow: hidden;
  }

  &__maximaze-item {
    position: absolute;
    right: 10px;
    top: 10px;
  }

  .card__button {
    .button {
      height: 40px;
      font-size: 12px;
      font-weight: bold;
      letter-spacing: 1px;
    }
  }
}
</style>
