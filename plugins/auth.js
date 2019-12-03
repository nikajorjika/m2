export default async function ({ app, $axios, store }) {
  const token = app.$cookies.get('auth._token.local')
  const baseUrl = process.env.SERVER_IP
  if(token) {
    const normalized = `http:${baseUrl}/user/current-user`.replace('//user', '/user')
    await $axios.get(normalized, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(({data}) => {
      app.store.commit('auth/SET', {
        key: 'user',
        value: data.user 
      })
    })
    .catch((err) => {
      if(err.response.status === 401) {
        const token = app.$cookies.set('auth._token.local', false)
        app.store.commit('auth/SET', {
          key: 'user',
          value: false
        })
      }
    })
  }
}