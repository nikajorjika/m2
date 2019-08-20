import { isObjectEqual } from '~/utils/Mixed'
export default function({ isHMR, app, store, route, params, error, redirect }) {
  console.log(isObjectEqual(store.getters['Flats/flat']))
  if (isObjectEqual(store.getters['Flats/flat'], {})) {
    redirect(`/${store.state.locale}/choose`)
  }
  app.i18n.locale = store.state.locale
}
