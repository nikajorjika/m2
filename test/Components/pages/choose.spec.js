import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Choose from '@/pages/_lang/choose.vue'

describe('Choose.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  let store
  const push = jest.fn()
  const chooseFlatFromFlatsAction = jest.fn()
  const fetchFlatData = jest.fn()
  beforeEach(() => {
    store = new Vuex.Store({
      getters: {
        locale: () => 'en'
      },
      modules: {
        Flats: {
          namespaced: true,
          state: {
            flats: []
          },
          getters: {
            flatsData: (state) => state.flats
          },
          actions: {
            chooseFlatFromFlats: chooseFlatFromFlatsAction,
            fetchFlatData
          }
        }
      }
    })
  })
  const factory = (customStore) => {
    return shallowMount(Choose, {
      mocks: {
        $router: {
          push
        }
      },
      localVue,
      store: customStore || store
    })
  }
  test('Is Vue instance', () => {
    const wrapper = factory()

    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('Is Calling choose Flat on flat click', () => {
    const customStore = new Vuex.Store({
      getters: {
        locale: () => 'en'
      },
      modules: {
        Flats: {
          namespaced: true,
          getters: {
            flatsData: () => [
              {
                render_url: 'image.png',
                name: 'name'
              }
            ]
          },
          actions: {
            chooseFlatFromFlats: chooseFlatFromFlatsAction,
            fetchFlatData
          }
        }
      }
    })
    const wrapper = factory(customStore)
    wrapper.setMethods({ chooseFlat: jest.fn() })
    wrapper.find('.choose-flat__item__wrapper').trigger('click')
    expect(wrapper.vm.chooseFlat).toHaveBeenCalledTimes(1)
  })

  test('Is {chooseFlat} method firing Redirect and action for choosing single flat', () => {
    const wrapper = factory()
    wrapper.vm.chooseFlat({ name: 'nika' })
    expect(push).toHaveBeenCalledTimes(1)
    expect(chooseFlatFromFlatsAction).toHaveBeenCalledTimes(1)
  })

  test('Is {mounted} hook firing {fetchFlatData} action if data is empty', () => {
    expect(fetchFlatData).toHaveBeenCalled()
  })
})
