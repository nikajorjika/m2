export const state = () => ({
  locales: [`en`, 'ka'],
  locale: 'ka'
})
export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale
    }
  }
}
