<template>
  <div id="test" class="model-page">
    <article>
      <h3>
        {{
          model.name && model.name.hasOwnProperty(locale)
            ? model.name[locale]
            : ''
        }}
      </h3>
    </article>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  layout: 'ModelIndexLayout',
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

<style lang="scss" scoped></style>
