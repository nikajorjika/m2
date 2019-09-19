export default {
  mounted() {
    this.$cookies.remove('paveleon-app')
    this.$cookies.remove('paveleon-flat')
    this.$cookies.remove('paveleon-planshet')
    this.$router.push({ path: `/${this.$store.getters.locale}` })
  },
  render() {
    return '<template> <div> </div> </template>'
  }
}
