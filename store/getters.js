export default {
  /**
   * @return {string}
   */
  GET_DEFAULT_CURRENCY(state) {
    return state.defaultCurrency
  },
  GET_CURRENCY(state) {
    return state.currency
  },
  GET_CURRENCY_RATE(state) {
    return state.currencyRate
  },
  GET_CURRENCY_UPDATE_TIME(state) {
    return state.currencyUpdateTime
  },
  GET_CURRENCY_TTL(state) {
    return state.currencyTtl
  }
}
