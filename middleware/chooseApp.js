import { getData } from 'nuxt-storage/local-storage'
export default function({ store, route, redirect }) {
  console.log(getData('app'))
  if (getData('app') && getData('app') !== '') {
    redirect(`/${route.params.lang}/${getData('app')}`)
  }
}
