const state = () => ({})

const getters = {}

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

const mutations = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
