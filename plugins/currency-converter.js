import axios from 'axios'

export default ({ store }, inject) => {
  inject('currencyConverter', async (amount, currencyFrom, currencyTo) => {
    // Normalize price

    let price = parseFloat(amount.replace(',', ''))

    // Check if price is in default currency

    if (store.state.defaultCurrency !== currencyTo) {
      // Define exchange currency

      const currency = currencyFrom !== 'GEL' ? currencyFrom : currencyTo

      // Get currency rate

      const { data } = await axios.get(
        process.env.SERVER_IP + '/currency?currency=' + currency
      )

      const rate = parseFloat(data)

      // Calculate price based on currency rate

      price = currency === 'GEL' ? price / rate : price * rate
    }

    // Return formatted price

    return new Intl.NumberFormat('ka-GE').format(price.toFixed(2))
  })
}
