export default function({ app, store, route, redirect, error }) {
  if (!store.getters['model/model']) {
    redirect(`/${route.params.lang}/model`)
  }
}
