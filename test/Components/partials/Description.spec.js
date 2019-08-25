import { shallowMount } from '@vue/test-utils'
import Makover from '@/components/core/Description.vue'

const factory = () => {
  return shallowMount(Makover, {
    propsData: {
      title: 'Title',
      text: 'Description'
    }
  })
}

describe('Description.vue', () => {
  test('is a Vue instance', () => {
    const wrapper = factory()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
