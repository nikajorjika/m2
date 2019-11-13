import Vue from 'vue'
import Pusher from 'vue-pusher'

Vue.use(Pusher, {
  api_key: process.env.PUSHER_APP_KEY,
  options: {
    cluster: process.env.PUSHER_APP_CLUSTER,
    encrypted: false
  }
})
