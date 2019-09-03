export default function({ app, store, route, redirect, error }) {
  if (error) return

  if (app.$cookies.get('paveleon-app')) {
    redirect(`/${route.params.lang}/${app.$cookies.get('paveleon-app')}`)
  }
}
