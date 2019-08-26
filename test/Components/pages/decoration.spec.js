import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Decoration from '@/pages/_lang/decoration.vue'

describe('decoration.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  localVue.directive('swiper', () => {})
  let store = new Vuex.Store({
    modules: {
      Flats: {
        namespaced: true,
        getters: {
          flat: () => {
            return {
              decoration: {
                price: 15,
                decoration_info: []
              },
              renovation_flat_properties: [
                {
                  type: 'area',
                  name: 'flat',
                  number: 12
                }
              ]
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
  test('price is set correctly', () => {
    const wrapper = factory()
    expect(wrapper.vm.price).toBe(180)
  })
  test('Price is set to 0 if no info', () => {
    store = new Vuex.Store({
      modules: {
        Flats: {
          namespaced: true,
          getters: {
            flat: () => {
              return {
                decoration: {
                  price: 15,
                  decoration_info: []
                },
                renovation_flat_properties: []
              }
            }
          }
        }
      }
    })
    const wrapper = factory()
    expect(wrapper.vm.price).toBe(0)
  })
})
