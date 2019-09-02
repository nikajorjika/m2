import { isObjectEqual } from '@/utils/Mixed'

export const state = function() {
  return {
    flatsData: [],
    flat: []
  }
}

export const getters = {
  priceList: (state) => state.priceList,
  areaList: (state) => state.areaList,
  flatsData: (state) => state.flatsData,
  flat: (state) => state.flat,
  rooms: (state) => {
    if (isObjectEqual(state.flat, {})) return []
    return state.flat.renovation_flat_properties.filter((item) => {
      return item.type === 'room'
    })
  }
}

export const mutations = {
  SET_TABLET_TYPE: (state, data) => {
    state.areaList = data
  },
  SET_FLATS_DATA: (state, data) => {
    state.flatsData = data
  },
  SET_FLAT_DATA(state, data) {
    this.$cookies.set('paveleon-flat', data.id, {
      path: '/',
      maxAge: 60 * 60 * 24 * 6000
    })
    state.flat = data
  },
  SET_FLAT_STATE(state, data) {
    state.flat = data
  }
}

export const actions = {
  fetchFlatData({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get('/renovation-flats')
        .then(({ data }) => {
          commit('SET_FLATS_DATA', data.data)
          resolve(data.data)
        })
        .catch((e) => reject(e))
    })
  },
  fetchFlat({ commit }) {
    const id = this.$cookies.get('paveleon-flat')
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`/renovation-flats/${id}`)
        .then(({ data }) => {
          commit('SET_FLAT_STATE', data.data)
          resolve(data.data)
        })
        .catch((e) => reject(e))
    })
  },
  chooseFlatFromFlats({ commit }, data) {
    commit('SET_FLAT_DATA', data)
  },
  setFlatDataFromCookies({ commit }) {
    const data = this.$cookies.get('paveleon-flat')
    commit('SET_FLAT_STATE', data)
  }
}
