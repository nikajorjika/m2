import { shallowMount } from '@vue/test-utils'
import CloseButton from '@/components/partials/CloseButton.vue'

const factory = () => {
  return shallowMount(CloseButton, {
    propsData: {
      buttonText: 'Text'
    }
  })
}

describe('Description.vue', () => {
  test('is a Vue instance', () => {
    const wrapper = factory()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  test('Click works', () => {
    const wrapper = factory()
    wrapper.setMethods({ handleClick: jest.fn() })

    wrapper.find('.faq-button').trigger('click')

    expect(wrapper.vm.handleClick).toHaveBeenCalledTimes(1)
  })

  test('Click Emits Click event', () => {
    const wrapper = factory()

    wrapper.find('.faq-button').trigger('click')

    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('is required, is a String and validates correctly', () => {
    const cmp = factory()
    const buttonText = cmp.vm.$options.props.buttonText
    expect(buttonText.required).toBeTruthy()
    expect(buttonText.type).toBe(String)
  })
})
