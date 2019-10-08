const state = () => ({
  filters: {},
  presets: []
})

const getters = {
  filters: (state) => state.filters,
  presets: (state) => state.presets
}

const mutations = {
  SET_FILTER_PRESETS: (state, payload) => {
    state.presets = payload
  } 
}

const actions = {
  registerUser(context, data) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(`/user/register`, data)
        .then((response) => {
          resolve(response)
          if (response.status === 200) {
            resolve(response)
          }
        })
        .catch((e) => reject(e))
    })
  },
  loginUser(context, data) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(`/user/verify`, data)
        .then((response) => {
          if (response.status === 200) {
            resolve(response)
          }
        })
        .catch((e) => reject(e))
    })
  },
  fetchFilterPresets({commit}) {
    return new Promise((resolve, reject) => {
      this.$axios.get('filter-presets')
        .then(({data}) => {
          commit('SET_FILTER_PRESETS', data.data)
          resolve(data.data)
        })
        .catch(error => console.error(error))
    })
  }
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
