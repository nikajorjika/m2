export default function({ store, redirect }) {
  if (!store.state.currency) {
    store.commit('SET_DEFAULT_CURRENCY', 'USD')
    store.commit('SET_CURRENCY', 'GEL')

    return redirect
  }
}
