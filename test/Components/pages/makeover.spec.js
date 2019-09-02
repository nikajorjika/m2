import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Makeover from '@/pages/_lang/renovations/makeover.vue'

describe('decoration.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const store = new Vuex.Store({
    modules: {
      Flats: {
        namespaced: true,
        getters: {
          flat: () => {
            return {
              renovation: {
                renovation_info: []
              }
            }
          }
        }
      }
    }
  })
  const factory = () => {
    return shallowMount(Makeover, {
      localVue,
      store
    })
  }

  test('Is vue instance', () => {
    const wrapper = factory()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
