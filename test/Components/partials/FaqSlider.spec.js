import Vuex from 'vuex'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import FaqSlider from '@/components/partials/FaqSlider.vue'
import { getters, mutations } from '@/store/FAQ'

const localVue = createLocalVue()
let shouldBeEmptyState = false
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
localVue.use(Vuex)

localVue.directive('swiper', () => {})

const factory = (store, localVue) => {
  return shallowMount(FaqSlider, {
    mocks: {
      $store: store
    },
    localVue
  })
}

describe('FaqSlider.vue', () => {
  let store
  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        FAQ: {
          namespaced: true,
          getters,
          actions: {
            fetchFAQ: jest
              .fn()
              .mockResolvedValueOnce('Resolve')
              .mockRejectedValueOnce(new Error('Error'))
          },
          state: shouldBeEmptyState || mockState,
          mutations
        }
      }
    })
  })
  test('is a Vue instance', () => {
    const wrapper = factory(store, localVue)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  test('Check if mounted works fine', async () => {
    shouldBeEmptyState = true
    const wrapper = factory(store, localVue)
    await expect(wrapper.vm.fetchFAQ()).resolves.toBe('Resolve')
    await expect(wrapper.vm.fetchFAQ()).rejects.toThrow('Error')
  })
})
