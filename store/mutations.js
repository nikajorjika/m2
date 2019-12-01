export default {
  SET_DEFAULT_CURRENCY(state, currency) {
    state.defaultCurrency = currency
  },
  SET_CURRENCY(state, currency) {
    state.currency = currency
  },
  SET_CURRENCY_RATE(state, rate) {
    state.currencyRate = rate
  },
  SET_CURRENCY_UPDATED_TIME(state, timestamp) {
    state.currencyUpdatedTime = timestamp
  },
  SET_CURRENCY_TTL(state, seconds) {
    state.currencyTtl = seconds
  }
}
