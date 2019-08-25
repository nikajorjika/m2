import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import FlatView from '@/components/core/FlatView.vue'

describe('FlatView.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const store = new Vuex.Store({
    getters: {
      locale: () => 'en'
    }
  })
  const push = jest.fn()
  const factory = () => {
    return shallowMount(FlatView, {
      mocks: {
        $router: {
          push
        }
      },
      localVue,
      store
    })
  }

  test('Is vue instance', () => {
    const wrapper = factory()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('Is {goToFaq} Calling router push', () => {
    const wrapper = factory()
    wrapper.vm.goToFaq()
    expect(push).toHaveBeenCalledTimes(1)
  })
})
