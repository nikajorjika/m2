export default ({ app, store }, inject) => {
  inject('currencyConverter', (amount, currency, format = false) => {
    // Normalize price
    if(amount !== undefined && amount !== null) {
      let price = parseFloat(amount.toString().replace(',', ''))
      
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
