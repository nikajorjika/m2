import ChoseFlatFunction from '@/middleware/chosenFlat'
describe('ChosenFlat.js Middleware', () => {
  let store
  let route
  let redirect
  test('Redirects If Flat cookie is empty', () => {
    const dispatch = jest.fn()
    store = {
      getters: {
        'Flats/flat': {}
      },
      dispatch
    }
    route = { name: 'random-route', params: { lang: 'en' } }
    redirect = jest.fn()
    const app = {
      $cookies: { get: () => undefined }
    }
    ChoseFlatFunction({ app, store, route, redirect })
    expect(redirect).toHaveBeenCalledTimes(1)
  })
  test('Does not redirect If store Flat is not empty', () => {
    const dispatch = jest.fn()
    store = {
      getters: {
        'Flats/flat': { key: 1 }
      },
      dispatch
    }
    route = { name: 'random-route', params: { lang: 'en' } }
    redirect = jest.fn()
    const app = {
      $cookies: { get: () => 1 }
    }
    ChoseFlatFunction({ app, store, route, redirect })
    expect(redirect).toHaveBeenCalledTimes(0)
  })
  test('Does not redirect If store Flat is empty but route is already {lang-renovations-choose}', () => {
    const dispatch = jest.fn()
    store = {
      getters: {
        'Flats/flat': {}
      },
      dispatch
    }
    route = { name: 'lang-renovations-choose', params: { lang: 'en' } }
    const app = {
      $cookies: { get: () => undefined }
    }
    redirect = jest.fn()
    ChoseFlatFunction({ app, store, route, redirect })
    expect(redirect).toHaveBeenCalledTimes(0)
  })
})
