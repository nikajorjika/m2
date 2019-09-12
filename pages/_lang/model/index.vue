<template>
  <div id="test" class="model-page">
    <article>
      <ImageSlider :images="model && model.images ? model.images : []" />

      <h3 class="name">
        <span>{{ name }}</span>
      </h3>

      <div class="description">
        <p>{{ description }}</p>
      </div>

      <div class="buttons">
        <illustrated-button
          :label="buttonLabels.byFlatNumberLabel"
          :to-route="{
            name: 'lang-model-by-flat-number',
            params: { lang: locale }
          }"
        >
          <template v-slot:illustration></template>

          <template v-slot:icon></template>
        </illustrated-button>
      </div>
    </article>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import ImageSlider from '@/components/core/ImageSlider'
import IllustratedButton from '@/components/partials/IllustratedButton'

export default {
  components: { ImageSlider, IllustratedButton },
  layout: 'ModelIndexLayout',
  data() {
    return {
      buttonLabels: {
        byPhoneNumberLabel: this.$t('labels.ByPhoneNumber'),
        byFlatNumberLabel: this.$t('labels.ByFlatNumber'),
        byFilterLabel: this.$t('labels.ByFilter')
      },
      name: this.$t('titles.ModelIndexPage'),
      description: this.$t('descriptions.ModelIndexPage')
    }
  },
  computed: {
    ...mapGetters({
      locale: 'locale',
      model: 'model/model'
    })
  },
  mounted() {
    this.$store.dispatch('model/fetchModel')
  },
  methods: {
    ...mapActions(['model/fetchModel']),
    ...mapMutations(['model/setModel'])
  }
}
</script>

<style lang="scss" scoped>
.model-page {
  width: 100%;

  .name {
    max-width: fit(804); /* 804px */
    margin: fit(92, fitRaw(24)) 0 0 fit(70, fitRaw(24)); /* 92px 0 0 70px */
    font-family: $font-caps;
    font-size: fit(24); /* 24px */
    line-height: fit(30, fitRaw(24)); /* 30px */
    letter-spacing: 1px;
    color: $font-color;

    span {
      position: relative;
      z-index: 1;
      padding: 0 2px;

      &::before {
        content: '';
        position: absolute;
        bottom: 2px;
        left: 0;
        z-index: -1;
        width: 100%;
        height: 10px;
        background-color: rgba(242, 101, 41, 0.2);
      }
    }
  }

  .description {
    max-width: fit(804); /* 804px */
    margin: fit(50) 0 0 fit(70, fitRaw(16)); /* 50px  0 0 70px */
    font-family: $font;
    font-size: fit(16); /* 16px */
    line-height: fit(25, fitRaw(16)); /* 25px */
    color: $font-color;
  }

  .buttons {
    margin: fit(110) 0 0 fit(70); /* 110px 0 0 70px */
  }
}
</style>
