import { mapGetters } from "vuex"

export default {
  render() {},
  computed: {
    ...mapGetters(['locale'])
  },
  mounted() {
    if (this.$route.params.color) {
      this.$store.commit('SET_PLANSHET_COLOR', this.$route.params.color)
    }
    this.$router.push(`/${this.locale}/model`)
  }
}
