<template>
  <div class="choose-flat">
    <div
      v-for="(item, index) in flatsData"
      :key="index"
      class="choose-flat__item"
    >
      <div class="choose-flat__item__wrapper" @click="chooseFlat(item)">
        <div class="choose-flat__item__render">
          <img :src="item.render_url" alt="Flat render" />
        </div>
        <div class="choose-flat__item__label">
          {{ item.name.hasOwnProperty(locale) ? item.name[locale] : item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  layout: 'RenovationsLayout',
  middleware: 'chosenFlat',
  computed: {
    ...mapGetters({
      locale: 'locale',
      flatsData: 'Flats/flatsData'
    })
  },
  mounted() {
    if (!this.flatsData.length) {
      this.fetchFlatData()
    }
  },
  methods: {
    ...mapActions('Flats', ['chooseFlatFromFlats', 'fetchFlatData']),
    chooseFlat(item) {
      this.chooseFlatFromFlats(item)
      this.$router.push({ path: `/${this.locale}/renovations` })
    }
  }
}
</script>
<style lang="scss" scoped>
.choose-flat {
  display: flex;
  margin: 50px 0 0;
  &__item {
    width: 25%;
    margin: 0 25px;
    background: white;
    padding: 12px;
    border-radius: 12px;
    box-shadow: 4px 6px 34.56px 1.44px #ececcb29;
    &__render {
      img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
      }
    }
  }
}
</style>
