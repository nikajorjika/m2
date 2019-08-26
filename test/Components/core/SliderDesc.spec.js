import Vuex, { Store } from 'Vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import SliderDesc from '@/components/core/SliderDesc.vue'

describe('FlatView.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const store = new Store({
    getters: {
      locale: () => 'en'
    }
  })
  const factory = () => {
    return shallowMount(SliderDesc, {
      propsData: {
        items: []
      },
      localVue,
      store
    })
  }

  test('Is vue instance', () => {
    const wrapper = factory()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('Test if {messageFromSlider} function is setting data properly', () => {
    const wrapper = factory()
    expect(wrapper.vm.activeItem).toBe(0)
    wrapper.vm.messageFromSlider(1)
    expect(wrapper.vm.activeItem).toBe(1)
  })
})
