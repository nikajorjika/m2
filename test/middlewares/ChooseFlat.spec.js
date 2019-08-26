import ChoseFlatFunction from '@/middleware/chosenFlat'
describe('ChosenFlat.js Middleware', () => {
  let store
  let route
  let redirect
  test('Redirects If store Flat is empty', () => {
    store = {
      getters: {
        'Flats/flat': {}
      }
    }
    route = { name: 'random-route', params: { lang: 'en' } }
    redirect = jest.fn()
    ChoseFlatFunction({ store, route, redirect })
    expect(redirect).toHaveBeenCalledTimes(1)
  })
  test('Does not redirect If store Flat is not empty', () => {
    store = {
      getters: {
        'Flats/flat': { key: 1 }
      }
    }
    route = { name: 'random-route', params: { lang: 'en' } }
    redirect = jest.fn()
    ChoseFlatFunction({ store, route, redirect })
    expect(redirect).toHaveBeenCalledTimes(0)
  })
  test('Does not redirect If store Flat is empty but route is already {lang-choose}', () => {
    store = {
      getters: {
        'Flats/flat': {}
      }
    }
    route = { name: 'lang-choose', params: { lang: 'en' } }
    redirect = jest.fn()
    ChoseFlatFunction({ store, route, redirect })
    expect(redirect).toHaveBeenCalledTimes(0)
  })
})
