import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'
import FaqSlider from '@/components/partials/FaqSlider.vue'
import { getters, actions, state, mutations } from '@/store/FAQ'

const localVue = createLocalVue()

jest.mock('axios', () => {
  return {
    get: (...data) => data
  }
})

localVue.use(Vuex)

localVue.directive('swiper', () => {})

const factory = (store, localVue) => {
  return mount(FaqSlider, { store, localVue })
}

describe('FaqSlider.vue', () => {
  let store
  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        FAQ: {
          namespaced: true,
          getters,
          actions,
          state,
          mutations
        }
      }
    })
  })
  test('is a Vue instance', () => {
    const wrapper = factory(store, localVue)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
