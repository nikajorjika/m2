import nuxtStorage from 'nuxt-storage'
export const state = () => ({
  locales: [`en`, 'ka'],
  locale: 'ka',
  apps: ['sales', 'renovations', 'model'],
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
  },
  app: (state) => {
    return nuxtStorage.localStorage.getData('app')
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
      nuxtStorage.localStorage.setData('app', appName, 60000, 'd')
    }
  }
}
