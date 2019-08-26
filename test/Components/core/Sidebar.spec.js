import { shallowMount } from '@vue/test-utils'
import Sidebar from '@/components/core/Sidebar.vue'

describe('FlatView.vue', () => {
  const factory = () => {
    return shallowMount(Sidebar)
  }

  test('Is vue instance', () => {
    const wrapper = factory()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
