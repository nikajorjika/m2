export default function({ store, redirect }) {
  if (
    !store.state.defaultCurrency ||
    !store.state.currency ||
    !store.state.currencyTtl
  ) {
    store.commit('SET_DEFAULT_CURRENCY', 'USD')
    store.commit('SET_CURRENCY', 'GEL')
    store.commit('SET_CURRENCY_TTL', 3600)

    return redirect
  }
}
