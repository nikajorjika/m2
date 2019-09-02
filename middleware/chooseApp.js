export default function({ app, store, route, redirect }) {
  if (app.$cookies.get('paveleon-app')) {
    redirect(`/${route.params.lang}/${app.$cookies.get('paveleon-app')}`)
  }
}
