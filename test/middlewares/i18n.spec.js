import i18nMiddleware from '@/middleware/i18n'
describe('ChosenFlat.js Middleware', () => {
  let store
  let isHMR
  let route
  let app
  let params
  let error
  let redirect
  test('Terminates middleware if there is an error', () => {
    error = () => true
    redirect = jest.fn()
    i18nMiddleware({ isHMR, app, store, route, params, error, redirect })
    expect(redirect).toHaveBeenCalledTimes(0)
  })
  test('Terminates middleware if there call is HMR(Hot Module Replacement)', () => {
    redirect = jest.fn()
    store = { commit: jest.fn() }
    isHMR = true
    error = () => false
    app = {
      i18n: {
        locale: 'tr'
      }
    }
    params = {
      lang: 'en'
    }
    i18nMiddleware({ isHMR, app, store, route, params, error, redirect })
    expect(store.commit).toHaveBeenCalledTimes(0)
    expect(redirect).toHaveBeenCalledTimes(0)
    expect(params.lang).toBe('en')
    expect(app.i18n.locale).toBe('tr')
  })
  test('Redirects if there is no lang parameters in url', () => {
    redirect = jest.fn()
    params = {}
    isHMR = false
    route = { path: '/some-path' }
    error = () => false
    i18nMiddleware({ isHMR, app, store, route, params, error, redirect })
    expect(redirect).toHaveBeenCalledTimes(1)
  })
  test('Redirects if request is on root url {/}', () => {
    redirect = jest.fn()
    params = { lang: 'en' }
    isHMR = false
    route = { path: '/', fullPath: '/' }
    error = () => false
    i18nMiddleware({ isHMR, app, store, route, params, error, redirect })
    expect(redirect).toHaveBeenCalledTimes(1)
    expect(redirect.mock.calls[0][0]).toBe('/ka/')
  })
  test('Changes i18n/store languages when passed new language', () => {
    params = { lang: 'en' }
    isHMR = false
    error = () => false
    route = { path: '/ka', fullPath: '/ka' }
    store = { commit: jest.fn() }
    app = {
      i18n: {
        locale: 'ka'
      }
    }
    params = {
      lang: 'en'
    }
    error = () => false
    expect(app.i18n.locale).toBe('ka')
    i18nMiddleware({ isHMR, app, store, route, params, error, redirect })
    expect(app.i18n.locale).toBe('en')
    expect(store.commit).toHaveBeenCalledTimes(1)
    expect(store.commit.mock.calls[0][0]).toBe('SET_LANG')
    expect(store.commit.mock.calls[0][1]).toBe('en')
  })
})
