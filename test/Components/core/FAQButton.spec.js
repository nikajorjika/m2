import { mount } from '@vue/test-utils'
import FAQButton from '@/components/core/FAQButton.vue'
describe('FAQButton.vue', () => {
  const factory = () => {
    return mount(FAQButton, {
      mocks: {
        $t: jest.fn()
      }
    })
  }

  test('Is vue instance', () => {
    const wrapper = factory()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('Click Calls {handleClick} function', () => {
    const wrapper = factory()
    const handleClick = jest.fn()
    wrapper.setMethods({ handleClick })
    wrapper.find('.faq-button').trigger('click')
    expect(wrapper.vm.handleClick).toHaveBeenCalledTimes(1)
  })

  test('Is {handleClick} function emitting event', () => {
    const wrapper = factory()
    wrapper.vm.handleClick()

    expect(wrapper.emitted('click').length).toBe(1)
  })
})
