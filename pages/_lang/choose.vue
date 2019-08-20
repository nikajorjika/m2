<template>
  <div class="choose-flat">
    <div
      v-for="(item, index) in $store.getters['Flats/flatsData']"
      :key="index"
      class="choose-flat__item"
    >
      <div class="choose-flat__item__wrapper" @click="chooseFlat(item)">
        <div class="choose-flat__item__render">
          <img :src="item.render_url" alt="Flat render" />
        </div>
        <div class="choose-flat__item__label">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    if (!this.$store.getters['Flats/flatsData'].length) {
      this.$store
        .dispatch('Flats/fetchFlatData')
        .then(({ data }) => {
          console.log(data)
        })
        .catch((e) => console.error(e))
    }
  },
  methods: {
    chooseFlat(item) {
      this.$store.dispatch('Flats/choseFlatFromFlats', item)
      this.$router.push({ path: `/${this.$store.state.locale}/` })
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
