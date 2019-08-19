export const state = () => ({
  locales: [`en`, 'ka'],
  locale: 'ka',
  overlay: {
    image: '',
    open: false
  }
})

export const getters = {
  overlay: (state) => {
    return state.overlay
  }
}

export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale
    }
  },

  setOverlay(state, overlay) {
    state.overlay = overlay
  }
}
