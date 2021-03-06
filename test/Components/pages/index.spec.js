import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import IndexPage from '@/pages/_lang/renovations/index.vue'

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
              image_label: 'renderLabel',
              renovation_flat_properties: [
                {
                  type: 'area',
                  name: 'bedroom',
                  number: 120
                },
                {
                  type: 'area',
                  name: 'bedroom',
                  number: 122
                },
                {
                  type: 'price',
                  name: 'furniture',
                  number: 12
                },
                {
                  type: 'price',
                  name: 'renovation',
                  number: 12
                },
                {
                  type: 'room',
                  name: 'bedroom',
                  number: 12
                },
                {
                  type: 'room',
                  name: 'bathroom',
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
    return shallowMount(IndexPage, {
      mocks: {
        $t: (str) => str
      },
      localVue,
      store
    })
  }

  test('Is vue instance', () => {
    const wrapper = factory()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('Is renderLabel computed set correctly', () => {
    const wrapper = factory()
    expect(wrapper.vm.renderLabel).toBe('renderLabel')
  })

  test('Is Prices array is correct length + additional 1 item for calculated full price', () => {
    const wrapper = factory()
    expect(wrapper.vm.prices.length).toBe(5)
  })
  test('Is Area array is correct length', () => {
    const wrapper = factory()
    expect(wrapper.vm.areas.length).toBe(2)
  })
  test('Is decorationPrice is correct', () => {
    const wrapper = factory()
    expect(wrapper.vm.areas.length).toBe(2)
  })
})
