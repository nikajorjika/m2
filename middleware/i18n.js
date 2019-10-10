/*
 * 1. sets i18n.locale and state.locale if possible
 * 2. redirects if not with locale
 */
export default function({ isHMR, app, store, route, params, error, redirect }) {
  if (error()) return

  // Check if router exists
  const resolve = app.router.resolve(route.fullPath)
  if (!resolve.route.name) {
    return error({ statusCode: 404, message: 'Page Not Found' })
  }
  if (isHMR) {
    // ignore if called from hot module replacement
    return
  } // if url does not have language, redirect to english
  else if (route.path === '/' || !params.lang) {
    return redirect('/ka' + route.fullPath)
  }
  // based on directory structure _lang/xxxx, en/about has params.lang as "en"
  const locale = params.lang || 'ka'
  store.commit('SET_LANG', locale) // set store
  app.i18n.locale = locale
}
