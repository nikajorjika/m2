export default ({ app, store }, inject) => {
  inject('currencyConverter', (amount, currency, format = false) => {
    if(amount !== undefined && amount !== null) {
      // Normalize price
      let price = typeof amount === 'string' ? amount : amount.toString()
      price = parseFloat(price.replace(',', ''))
      
      // Get currency rate
      let rate = store.getters['settings/currencyRate']
      
      rate = parseFloat(rate)
  
      // Calculate price based on currency rate
      price = currency === 'GEL' ? price * rate : price
      // Return formatted price
      return format ? new Intl.NumberFormat('ka-GE').format(parseFloat(price.toFixed(2))) : parseFloat(price.toFixed(2))
    }
  })
}
