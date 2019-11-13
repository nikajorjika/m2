import axios from 'axios'

export default ({ app }, inject) => {
  inject('currencyConverter', async (amount, currencyFrom, currencyTo) => {
    const currency = currencyFrom !== 'GEL' ? currencyFrom : currencyTo
    const { data } = await axios.get(
      process.env.SERVER_IP + '/currency?currency=' + currency
    )

    const rate = parseFloat(data)
    const price = parseFloat(amount.replace(',', ''))
    const number = currency === 'GEL' ? price / rate : price * rate

    return new Intl.NumberFormat('ka-GE').format(number.toFixed(2))
  })
}
