import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import ButtonOrange from '@/components/partials/FaqSlider.vue'
import { getters, actions, state, mutations } from '@/store/FAQ'

const localVue = createLocalVue()

localVue.use(Vuex)

const factory = (store, localVue) => {
  return shallowMount(ButtonOrange, { store, localVue })
}

describe('FaqSlider.vue', () => {
  let store
  beforeEach(() => {
    store = new Vuex.Store({
      namespaced: true,
      modules: {
        namespaced: true,
        FAQ: { getters, actions, state, mutations }
      }
    })
  })

  test('is a Vue instance', () => {
    const wrapper = factory(store, localVue)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
