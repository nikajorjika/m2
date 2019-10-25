const state = () => ({
  flat: {},
  renovations: [],
  furniture: [],
  decorations: [],
  appliances: [],
  renovationId: null,
  furnitureId: null,
  decorationId: null,
  appliancesIds: []
})

const getters = {
  flat: (state) => state.flat,
  renovations: (state) => state.renovations,
  furniture: (state) => state.furniture,
  decorations: (state) => state.decorations,
  appliances: (state) => state.appliances,
  renovationId: (state) => state.renovationId,
  furnitureId: (state) => state.furnitureId,
  decorationId: (state) => state.decorationId,
  appliancesIds: (state) => state.appliancesIds
}

const mutations = {
  setFlat(state, payload) {
    state.flat = payload.data
  },
  setRenovations(state, payload) {
    state.renovations = payload.data
  },
  setFurniture(state, payload) {
    state.furniture = payload.data
  },
  setDecorations(state, payload) {
    state.decorations = payload.data
  },
  setAppliances(state, payload) {
    state.appliances = payload.data
  },
  SET_RENOVATION_ID(state, id) {
    state.renovationId = id
  },
  SET_FURNITURE_ID(state, id) {
    state.furnitureId = id
  },
  SET_DECORATION_ID(state, id) {
    state.decorationId = id
  },
  SET_APPLIANCES_IDS(state, ids) {
    state.appliancesIds = ids
  }
}

const actions = {
  async fetchFlat({ commit }, id) {
    const response = await this.$axios.get(`/flats/${id}`)

    commit('setFlat', response.data)
  },
  async fetchRenovations({ commit }) {
    const response = await this.$axios.get('/renovations')

    commit('setRenovations', response.data)
  },
  async fetchFurniture({ commit }) {
    const response = await this.$axios.get('/furniture')

    commit('setFurniture', response.data)
  },
  async fetchDecorations({ commit }) {
    const response = await this.$axios.get('/decorations')

    commit('setDecorations', response.data)
  },
  async fetchAppliances({ commit }) {
    const response = await this.$axios.get('/appliances')

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
