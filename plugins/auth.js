export default async function({ app, $axios, store }) {
  const token = app.$cookies.get('auth._token.local')
  if (token) {
    app.store.commit('auth/SET', {
      key: 'token',
      value: token
    })
    await $axios
      .get('user/current-user', {
        rejectUnauthorized: false,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(({ data }) => {
        app.store.commit('auth/SET', {
          key: 'user',
          value: data.user
        })
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          app.$cookies.set('auth._token.local', false)
          app.store.commit('auth/SET', {
            key: 'user',
            value: false
          })
        }
      })
  }
}
