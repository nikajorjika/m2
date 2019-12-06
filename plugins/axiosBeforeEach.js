import https from 'https'

export default function ({app, $axios }) {
  const agent = new https.Agent({  
    rejectUnauthorized: false
  })
  $axios.onRequest((config) => {
    const token = app.$cookies.get('auth._token.local')
    if (process.server) {
      config.httpsAgent = agent
    }
    if (process.server) {
      config.baseURL = `https:${config.baseURL}`
    }
    
    if(token) {
      config.headers.Authorization = `Bearer ${token}`
    }else {
      config.headers.Authorization = false
    }
    return config;
  })
  $axios.onError((error) => {
    // Do something with request error
    if(process.env.NODE_ENV === 'production') {
      app.$toast.global.generalError().goAway(1500)
    }else {
      const response = error.response
      if(response) {
        if(response.status === 400 && response.data.hasOwnProperty('msg')) {
          for(let i in response.data.msg) {
            if(response.data.msg.hasOwnProperty(i)) {
              const message = response.data.msg[i] instanceof Array ? response.data.msg[i][0] : response.data.msg[i]
              app.$toast.show(message, {
                type: 'error'
              }).goAway(1500)
            }
          }
        } else if(response.status === 401) {
          app.$toast.show(app.$t('errors.unauthorized'), {
            type: 'error'
          }).goAway(1500)
        } else {
          app.$toast.global.generalError().goAway(1500)
        }
      } else {
        app.$toast.global.generalError().goAway(1500)
      }
    }
    return Promise.reject(error);
  })
}