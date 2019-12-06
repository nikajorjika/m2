import https from 'https'

export default function ({app, $axios }) {
  const agent = new https.Agent({  
    rejectUnauthorized: false
  })
  $axios.onRequest((config) => {
    const token = app.$cookies.get('auth._token.local')
    if (process.env.NODE_ENV === 'development') {
      config.httpsAgent = agent
    }
    if (process.env.NODE_ENV === 'development') {
      config.baseURL = `https:${config.baseURL}`
    }
    
    if(token) {
      config.headers.Authorization = `Bearer ${token}`
    }else {
      config.headers.Authorization = false
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  })
}