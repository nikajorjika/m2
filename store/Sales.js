const state = () => ({})

const getters = {}

const actions = {
  registerUser(context, data) {
    return new Promise((resolve, reject) => {
      resolve()
      this.$axios
        .post(`/user/register`, data)
        .then(() => {
          resolve()
        })
        .catch((e) => reject(e))
    })
  },
  loginUser(context, data) {
    return new Promise((resolve, reject) => {
      resolve()
      this.$axios
        .post(`/user/verify`, data)
        .then(() => {
          resolve()
        })
        .catch((e) => reject(e))
    })
  }
}

const mutations = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
