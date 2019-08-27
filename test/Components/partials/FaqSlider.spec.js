import Vuex from 'vuex'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import FaqSlider from '@/components/partials/FaqSlider.vue'
import { getters, mutations } from '@/store/FAQ'

describe('FaqSlider.vue', () => {
  const localVue = createLocalVue()
  const factory = (store) => {
    return shallowMount(FaqSlider, {
      localVue,
      store
    })
  }
  let popStore
  let emptyStore
  const mockState = () => ({
    questionList: [
      {
        title: {
          en: 'Consequatur velit placeat modi excepturi est sed.',
          ka: 'Consequatur velit placeat modi excepturi est sed.'
        },
        content: {
          en: 'Consequatur velit placeat modi excepturi est sed.',
          ka: 'Consequatur velit placeat modi excepturi est sed.'
        }
      }
    ]
  })
  const shouldBeCalled = jest.fn()
  const shouleNotBeCalled = jest.fn()
  beforeEach(() => {
    localVue.use(Vuex)

    localVue.directive('swiper', () => {})

    emptyStore = new Vuex.Store({
      getters: {
        locale: () => 'en'
      },
      modules: {
        FAQ: {
          namespaced: true,
          getters,
          actions: {
            fetchFAQ: shouldBeCalled
          },
          state: {
            questionList: []
          },
          mutations
        }
      }
    })

    popStore = new Vuex.Store({
      getters: {
        locale: () => 'en'
      },
      modules: {
        FAQ: {
          namespaced: true,
          getters,
          actions: {
            fetchFAQ: shouleNotBeCalled
          },
          state: mockState(),
          mutations
        }
      }
    })
  })

  test('is a Vue instance', () => {
    const wrapper = factory(emptyStore, localVue)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  test('Check if mounted works fine', () => {
    factory(emptyStore)
    expect(shouldBeCalled).toHaveBeenCalled()
  })
  test('Check if mounted doesnt call for fetch if there is already data in store', () => {
    factory(popStore)
    expect(shouleNotBeCalled).not.toHaveBeenCalled()
  })
})
