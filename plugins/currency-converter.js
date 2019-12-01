export default ({ app, store }, inject) => {
  inject('currencyConverter', async (amount, currencyFrom, currencyTo) => {
    // Normalize price

    let price = parseFloat(amount.replace(',', ''))

    // Check if price is in default currency

    if (store.state.defaultCurrency !== currencyTo) {
      // Define exchange currency

      const currency = currencyFrom !== 'GEL' ? currencyFrom : currencyTo

      // Get currency rate

      let rate
      const now = Date.now() / 1000

      if (
        !store.state.currencyRate ||
        !store.state.currencyUpdatedTime ||
        now - store.state.currencyUpdatedTime > store.state.currencyTtl
      ) {
        const { data } = await app.$axios.get(
          process.env.SERVER_IP.replace(/\/$/, '') +
            '/currency?currency=' +
            currency
        )

        rate = data

        store.commit('SET_CURRENCY_RATE', rate)
        store.commit('SET_CURRENCY_UPDATED_TIME', now)
      } else {
        rate = store.state.currencyRate
      }

      rate = parseFloat(rate)

      // Calculate price based on currency rate

      price = currency === 'GEL' ? price / rate : price * rate
    }

    // Return formatted price

    return new Intl.NumberFormat('ka-GE').format(parseFloat(price.toFixed(2)))
  })
}
