export default function ({app, $axios }) {
  $axios.onRequest((config) => {
    const token = app.$cookies.get('auth._token.local')
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