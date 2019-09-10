const state = () => ({
  model: {}
})

const getters = {
  model: (state) => state.model
}

const actions = {
  fetchModel({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get('/projects')
        .then(({ data }) => {
          commit('setModel', data.data[0])
          resolve(data.data)
        })
        .catch((e) => reject(e))
    })
  }
}

const mutations = {
  setModel(state, data) {
    state.model = data
  }
}

// export const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
