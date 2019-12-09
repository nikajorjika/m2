export default function({ isHMR, app, store, route, params, error, redirect }) {
  const locale = store.getters.locale
  if (!app.$cookies.get('auth._token.local')) {
    const redirectUrl = route.name ? `?redirect=${route.name}` : ''
    redirect(`/${locale}/sales/login${redirectUrl}`)
  }
}
