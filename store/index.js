export const state = () => ({
  locales: [`en`, 'ka'],
  locale: 'ka',
  apps: ['sales', 'renovations', 'model'],
  planshetIds: [1, 2, 3, 4, 5, 6, 7],
  app: '',
  overlay: {
    image: '',
    open: false
  }
})

export const getters = {
  overlay: (state) => {
    return state.overlay
  },
  locale: (state) => {
    return state.locale
  },
  allLocales: (state) => {
    return state.locales
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
  },
  SET_APP(state, appName) {
    if (state.apps.includes(appName)) {
      this.$cookies.set('paveleon-app', appName, {
        path: '/',
        maxAge: 60 * 60 * 24 * 6000
      })
    }
  },
  SET_PLANSHET_COLOR(state, id) {
    if (state.planshetIds.includes(parseInt(id))) {
      this.$cookies.set('paveleon-planshet', id, {
        path: '/',
        maxAge: 60 * 60 * 24 * 6000
      })
    }
  }
}
