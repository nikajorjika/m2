import Vuex from 'vuex'
import * as Axios from 'axios'
import { mount, createLocalVue } from '@vue/test-utils'
import FaqSlider from '@/components/partials/FaqSlider.vue'
import { getters, actions, mutations } from '@/store/FAQ'

const localVue = createLocalVue()

jest.mock('axios', () => {
  return {
    get: (...data) => data
  }
})
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

localVue.use(Axios)

localVue.directive('swiper', () => {})

const factory = (store, localVue) => {
  return mount(FaqSlider, { store, localVue, axios: Axios })
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
          state: mockState,
          mutations
        }
      }
    })
  })
  test('is a Vue instance', () => {
    const wrapper = factory(store, localVue)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  test('is a Vue instance', () => {
    const wrapper = factory(store, localVue)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
