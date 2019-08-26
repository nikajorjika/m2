import { shallowMount } from '@vue/test-utils'
import FAQPage from '@/pages/_lang/faq.vue'

describe('decoration.vue', () => {
  const factory = () => {
    return shallowMount(FAQPage)
  }

  test('Is vue instance', () => {
    const wrapper = factory()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
