export default function({ app, store, route, redirect }) {
  if (
    route.name !== 'lang-renovations-choose' &&
    !app.$cookies.get('paveleon-flat')
  ) {
    redirect(`/${route.params.lang}/renovations/choose`)
  } else if (
    Object.entries(store.getters['Flats/flat']).length === 0 &&
    app.$cookies.get('paveleon-flat')
  ) {
    store.dispatch('Flats/fetchFlat')
  }
}
