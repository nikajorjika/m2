import { isObjectEqual } from '@/utils/Mixed'

export const state = () => ({
  flatsData: [],
  flat: {}
})

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
  SET_FLAT_DATA: (state, data) => {
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
  choseFlatFromFlats({ commit }, data) {
    commit('SET_FLAT_DATA', data)
  }
}
