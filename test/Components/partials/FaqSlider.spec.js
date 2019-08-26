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
        answer:
          'Voluptatem laboriosam alias omnis sed velit voluptatem. Consequatur velit placeat modi excepturi est sed. Dolorum aut et recusandae maiores quas quia illo enim. Beatae repellat odio laboriosam.',
        application_type: 'ThpQGxmtgeOkwxwq',
        created_at: '2019-08-22 09:00:44',
        id: 1,
        question: 'Aut hic qui id minus rem sed suscipit.',
        updated_at: '2019-08-22 09:00:44'
      }
    ]
  })
  const shouldBeCalled = jest.fn()
  const shouleNotBeCalled = jest.fn()
  beforeEach(() => {
    localVue.use(Vuex)

    localVue.directive('swiper', () => {})

    emptyStore = new Vuex.Store({
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
