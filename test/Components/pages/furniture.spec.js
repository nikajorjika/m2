import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Furniture from '@/pages/_lang/furniture.vue'

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
              furniture: {
                furniture_info: []
              }
            }
          }
        }
      }
    }
  })
  const factory = () => {
    return shallowMount(Furniture, {
      localVue,
      store
    })
  }

  test('Is vue instance', () => {
    const wrapper = factory()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
