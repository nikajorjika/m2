const state = () => ({
  user: null,
  token: null
})

const getters = {
  user: (state) => state.user,
  token: (state) => state.token
}

const mutations = {
  SET: (state, { key, value }) => {
    state[key] = value
  },
  SET_TOKEN: (state, payload) => {
    state.token = payload
  }
}
const actions = {
  loginUser({ dispatch }, data) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(`/user/verify`, data)
        .then(({ data }) => {
          if (data.hasOwnProperty('access_token')) {
            dispatch('setUserData', data).then(() => {
              resolve(data)
            })
          } else {
            resolve()
          }
        })
        .catch((e) => reject(e))
    })
  },
  setUserData({ commit, dispatch }, data) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', data.access_token)
      this.$cookies.set('auth._token.local', data.access_token)
      dispatch('me').then(() => {
        resolve()
      })
    })
  },
  me({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`/user/current-user`)
        .then(({ data }) => {
          commit('SET', { key: 'user', value: data.user })
          resolve()
        })
        .catch((e) => {
          if (e.response.status === 401) {
            this.$cookies.set('auth._token.local', false)
          }
          reject(e)
        })
    })
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      commit('SET', { key: 'user', value: false })
      this.$cookies.set('auth._token.local', false)
      resolve(true)
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
