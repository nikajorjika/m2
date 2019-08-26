import { mount } from '@vue/test-utils'
import SlideSwitch from '@/components/partials/SlideSwitch.vue'

describe('SlideSwitch.js', () => {
  const factory = () => {
    return mount(SlideSwitch)
  }

  test('is a Vue instance', () => {
    const wrapper = factory()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('Test if default props are', () => {
    const wrapper = factory()
    expect(wrapper.vm.values[0].value).toBe(false)
    expect(wrapper.vm.values[1].value).toBe(true)
  })

  test('Test if {updateInput} is called on click', () => {
    const wrapper = factory()

    const updateInput = jest.fn()
    wrapper.setMethods({ updateInput })

    // Trigger Click event on component
    wrapper.find('.switch__inner').trigger('click')

    // Check if Update Input function is called
    expect(updateInput).toHaveBeenCalledTimes(1)
  })

  test('Test if {updateInput} function works', () => {
    const wrapper = factory()

    expect(wrapper.vm.value).toBe(false)

    wrapper.vm.updateInput()

    expect(wrapper.vm.value).toBe(true)

    wrapper.vm.updateInput()

    expect(wrapper.vm.value).toBe(false)

    expect(wrapper.emitted('input')).toBeTruthy()

    expect(wrapper.emitted('input')[0]).toEqual([true])
  })
})
