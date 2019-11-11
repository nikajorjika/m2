import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$currencyConverter = async (amount, currency = 'USD') => {
  const { data } = await axios.get(
    process.env.SERVER_IP + '/currency?currency=' + currency
  )

  return `${amount * data} GEL`
}
