import { shallowMount } from '@vue/test-utils'
import ButtonOrange from '@/components/partials/ButtonMainOrange.vue'

const factory = () => {
  return shallowMount(ButtonOrange, {
    propsData: {
      buttonText: 'Text'
    }
  })
}

describe('ButtonMainOrange.vue', () => {
  test('is a Vue instance', () => {
    const wrapper = factory()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
