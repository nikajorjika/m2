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
  const factory = () => {
    return shallowMount(TechnicCard, {
      propsData: {
        item: {
          name: 'something',
          description: 'something',
          image: 'test-image.png'
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
})
