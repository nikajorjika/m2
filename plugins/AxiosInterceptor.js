import Vue from 'vue'
import axios from 'axios'
const urls = {
  secure: process.env.SERVER_IP_SECURE,
  notSecure: process.env.SERVER_IP
}
const url = this.$cookies.get('paveleon-planshet')
  ? urls.notSecure
  : urls.secure
// eslint-disable-next-line no-undef
axios.interceptors.request.use(base(url))

axios.interceptors.request.use(
  (config) => {
    config.url = url
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

Vue.use(axios)