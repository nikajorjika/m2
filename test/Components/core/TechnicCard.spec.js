import Vuex, { Store } from 'Vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import TechnicCard from '@/components/core/TechnicCard.vue'

describe('FlatView.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const store = new Store({
    getters: {
      locale: () => 'en'
    }
  })
  const factory = (image) => {
    return shallowMount(TechnicCard, {
      propsData: {
        item: {
          name: 'something',
          description: 'something',
          image
        }
      },
      mocks: {
        $t: (item) => item
      },
      localVue,
      store
    })
  }

  test('Is vue instance', () => {
    const wrapper = factory()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('Is image url valid if image is supplied', () => {
    const wrapper = factory({ url: 'imageUrl.png' })
    expect(wrapper.vm.imageUrl).toBe('imageUrl.png')
  })

  test('Is image url empty if no image supplied', () => {
    const wrapper = factory(null)
    expect(wrapper.vm.imageUrl).toBe('')
  })
})
