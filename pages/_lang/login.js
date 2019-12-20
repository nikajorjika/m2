import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      locale: 'locale'
    })
  },
  layout: 'SalesWithoutNavigation',
  mounted() {
    this.$router.push({
      name: 'lang-sales-login',
      params: {
        lang: this.locale
      }
    })
  },
  render() {
    return '<div></div>'
  }
}