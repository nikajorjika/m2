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
    </article>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import ImageSlider from '@/components/core/ImageSlider'

export default {
  components: { ImageSlider },
  layout: 'ModelIndexLayout',
  data() {
    return {
      name: 'მონიშნე ფილტრები და განათე სასურველი ბინა',
      description:
        'შემთხვევითად გენერირებული ტექსტი ეხმარება დიზაინერებს და ტიპოგრაფიული ნაწარმის შემქმნელებს, ' +
        'რეალურთან მაქსიმალურად მიახლოებული შაბლონი წარუდგინონ შემფასებელს. ხშირადაა შემთხვევა, როდესაც დიზაინის ' +
        'შესრულებისას საჩვენებელია, თუ როგორი იქნება ტექსტის ბლოკი. სწორედ ასეთ დროს არის მოსახერხებელი'
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
}
</style>
