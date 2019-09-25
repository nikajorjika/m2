const state = () => ({})

const getters = {}

const actions = {
  saveLead(context, data) {
    return new Promise((resolve, reject) => {
      console.log(data)
      this.$axios
        .post(`/lead/leads`, data)
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
