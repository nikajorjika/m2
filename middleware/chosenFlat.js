export default async function({ app, store, route, redirect }) {
  if (route.name !== 'lang-renovations-choose') {
    redirect(`/${route.params.lang}/renovations/choose`)
  } else if (
    Object.entries(store.getters['Flats/flat']).length === 0 &&
    app.$cookies.get('paveleon-flat')
  ) {
    await store.dispatch('Flats/fetchFlat')
  }
}
