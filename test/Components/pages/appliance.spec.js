import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Appliance from '@/pages/_lang/appliance.vue'

describe('appliance.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  localVue.directive('swiper', () => {})
  let store
  const factory = (flat) => {
    store = store = new Vuex.Store({
      modules: {
        Flats: {
          namespaced: true,
          state: {
            flat
          },
          getters: {
            flat: (state) => state.flat
          },
          mutations: {
            SET_FLAT: (state, data) => {
              state.flat = data
            }
          }
        }
      }
    })
    return shallowMount(Appliance, {
      mocks: {
        $t: (item) => item,
        $store: store
      },
      localVue
    })
  }

  test('Is vue instance', () => {
    const data = {
      appliance: {
        appliance_info: []
      }
    }
    const wrapper = factory(data)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  test('Navigation is hidden/shown depending on items length', () => {
    const data = {
      appliance: {
        appliance_info: [
          {
            id: 2,
            appliance_id: 4,
            name: { en: 'Tenetur non soluta eos aperiam quam vero est' },
            description: { en: 'Tenetur non soluta eos aperiam quam vero est.' }
          }
        ]
      }
    }
    const wrapper = factory(data)
    expect(wrapper.vm.itemsData.length).toBe(1)
  })
  test('Navigation is hidden when items less than 3', () => {
    const data = {
      appliance: {
        appliance_info: [
          {
            id: 2,
            appliance_id: 4,
            name: { en: 'Tenetur non soluta eos aperiam quam vero est' },
            description: { en: 'Tenetur non soluta eos aperiam quam vero est.' }
          }
        ]
      }
    }
    const wrapper = factory(data)
    expect(wrapper.vm.disableBullet).toBe(true)
  })
  test('Navigation is shown when items more than 3', () => {
    const data = {
      appliance: {
        appliance_info: [
          {
            appliance_id: 4,
            name: { en: 'Tenetur non soluta eos aperiam quam vero est' },
            description: { en: 'Tenetur non soluta eos aperiam quam vero est.' }
          },
          {
            appliance_id: 4,
            name: { en: 'Tenetur non soluta eos aperiam quam vero est' },
            description: { en: 'Tenetur non soluta eos aperiam quam vero est.' }
          },
          {
            appliance_id: 4,
            name: { en: 'Tenetur non soluta eos aperiam quam vero est' },
            description: { en: 'Tenetur non soluta eos aperiam quam vero est.' }
          },
          {
            appliance_id: 4,
            name: { en: 'Tenetur non soluta eos aperiam quam vero est' },
            description: { en: 'Tenetur non soluta eos aperiam quam vero est.' }
          }
        ]
      }
    }
    const wrapper = factory(data)
    expect(wrapper.vm.disableBullet).toBe(false)
  })
})
