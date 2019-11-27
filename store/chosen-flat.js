const state = () => ({
  chosenFlat: {},
  flat: {},
  renovation: {},
  furniture: {},
  decoration: {},
  appliances: {}
})

const getters = {
  chosenFlat: (state) => state.chosenFlat,
  flat: (state) => state.flat,
  renovation: (state) => state.renovation,
  furniture: (state) => state.furniture,
  decoration: (state) => state.decoration,
  appliances: (state) => state.appliances
}

const mutations = {
  setChosenFlat(state, payload) {
    state.chosenFlat = payload.data
  },
  setFlat(state, payload) {
    state.flat =
      payload.data.flat !== undefined ? payload.data.flat : payload.data
  },
  setRenovation(state, payload) {
    state.renovation =
      payload.data.renovation !== undefined
        ? payload.data.renovation
        : payload.data
  },
  setFurniture(state, payload) {
    state.furniture =
      payload.data.furniture !== undefined
        ? payload.data.furniture
        : payload.data
  },
  setDecoration(state, payload) {
    state.decoration =
      payload.data.decoration !== undefined
        ? payload.data.decoration
        : payload.data
  },
  setAppliances(state, payload) {
    state.appliances =
      payload.data.appliances !== undefined
        ? payload.data.appliances
        : payload.data
  }
}

const actions = {
  async getChosenFlat({ commit }, flatId) {
    const response = await this.$axios.get(`/user-flats/${flatId}`)

    commit('setChosenFlat', response.data)
    commit('setFlat', response.data)
    commit('setRenovation', response.data)
    commit('setFurniture', response.data)
    commit('setDecoration', response.data)
    commit('setAppliances', response.data)
  },
  async getFlat({ commit }, id) {
    const response = await this.$axios.get(`/flat/${id}`)

    commit('setFlat', response.data)
  },
  async getRenovation({ commit }, id) {
    const response = await this.$axios.get(`/renovation/${id}`)

    commit('setRenovation', response.data)
  },
  async getFurniture({ commit }, id) {
    const response = await this.$axios.get(`/furniture/${id}`)

    commit('setFurniture', response.data)
  },
  async getDecoration({ commit }, id) {
    const response = await this.$axios.get(`/decoration/${id}`)

    commit('setDecoration', response.data)
  },
  async getAppliances({ commit }, ids) {
    const response = await this.$axios.get(`/appliances/show-all/${ids}`)

    commit('setAppliances', response.data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
