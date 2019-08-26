import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Decoration from '@/pages/_lang/decoration.vue'

describe('decoration.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  localVue.directive('swiper', () => {})
  const store = new Vuex.Store({
    modules: {
      Flats: {
        namespaced: true,
        getters: {
          flat: () => {
            return {
              decoration: {
                decoration_info: []
              }
            }
          }
        }
      }
    }
  })
  const factory = () => {
    return shallowMount(Decoration, {
      localVue,
      store
    })
  }

  test('Is vue instance', () => {
    const wrapper = factory()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
