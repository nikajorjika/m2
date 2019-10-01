const state = () => ({})

const getters = {}

const actions = {
  sendVerificationCode(context, data) {
    return new Promise((resolve, reject) => {
      resolve()
      // this.$axios
      //   .post(`/user/verify`, data)
      //   .then(() => {
      //     resolve()
      //   })
      //   .catch((e) => reject(e))
    })
  },
  verifyPhone(context, { code, formData }) {
    return new Promise((resolve, reject) => {
      resolve()
      // this.$axios
      //   .post(`/user/verify`, {code, formData})
      //   .then(() => {
      //     resolve()
      //   })
      //   .catch((e) => reject(e))
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
