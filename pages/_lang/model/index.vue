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
  width: 93vw; /* 1785.6px */

  .name {
    max-width: 804px; /* 804px */
    margin: 8.51vh 0 0 70px; /* 92px 0 0 70px */
    font-family: $font-caps;
    font-size: 24px;
    line-height: 30px;
    letter-spacing: 1px;
    color: $font-color;

    span {
      position: relative;
      z-index: 1;
      padding: 0 2px;

      &::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        height: 12px;
        background-color: rgba(242, 101, 41, 0.2);
      }
    }
  }

  .description {
    max-width: 804px; /* 804px */
    margin: 4.62vh 0 0 70px; /* 50px  0 0 70px */
    font-family: $font;
    font-size: 16px;
    line-height: 20px;
    color: $font-color;
  }
}
</style>
