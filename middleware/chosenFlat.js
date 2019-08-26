import { isObjectEqual } from '~/utils/Mixed'
export default function({ store, route, redirect }) {
  if (
    route.name !== 'lang-choose' &&
    isObjectEqual(store.getters['Flats/flat'], {})
  ) {
    redirect(`/${route.params.lang}/choose`)
  }
}
