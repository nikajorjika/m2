import Vuex from 'vuex'
import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import FlatNavigation from '@/components/core/FlatNavigation.vue'

describe('FlatNavigation.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const store = new Vuex.Store({
    getters: {
      locale: () => 'en'
    }
  })
  const factory = () => {
    return shallowMount(FlatNavigation, {
      mocks: {
        $t: (text) => text,
        $router: {
          go: jest.fn()
        },
        $route: {
          path: '/'
        }
      },
      localVue,
      store,
      stubs: {
        NuxtLink: RouterLinkStub
      }
    })
  }
  test('Is vue instance', () => {
    const wrapper = factory()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  test('Is same route check is done', () => {
    const wrapper = factory()
    wrapper.setMethods({ isSamePath: jest.fn() })
    wrapper.setProps({
      navData: [
        {
          path: '/route',
          title: 'title'
        },
        {
          path: '/route-2',
          title: 'title2'
        }
      ]
    })
    expect(wrapper.vm.isSamePath).toHaveBeenCalled()
  })
})
