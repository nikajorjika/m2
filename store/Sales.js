const state = () => ({
  temporaryToken: null
})

const getters = {
  temporaryToken: (state) => state.temporaryToken
}

const mutations = {
  SET: (state, {key, value}) => state[key] = value
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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
