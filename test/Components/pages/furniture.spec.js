import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Furniture from '@/pages/_lang/furniture.vue'

describe('furniture.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  let store = new Vuex.Store({
    modules: {
      Flats: {
        namespaced: true,
        getters: {
          flat: () => {
            return {
              furniture: {
                price: 15,
                furniture_info: []
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
    return shallowMount(Furniture, {
      localVue,
      store
    })
  }

  test('Is vue instance', () => {
    const wrapper = factory()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  test('Price is set correctly', () => {
    const wrapper = factory()
    expect(wrapper.vm.price).toBe(180)
  })
  test('Price is set to 0 if furniture info is empty', () => {
    store = new Vuex.Store({
      modules: {
        Flats: {
          namespaced: true,
          getters: {
            flat: () => {
              return {
                furniture: {
                  price: 15,
                  furniture_info: []
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
