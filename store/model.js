const state = () => ({
  model: {}
})

const getters = {
  model: (state) => state.model
}

const actions = {
  fetchModel({ commit }) {
    const id = 2 // TMP

    return new Promise((resolve, reject) => {
      this.$axios
        .get(`/projects/${id}`)
        .then(({ data }) => {
          commit('setModel', data.data)
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
