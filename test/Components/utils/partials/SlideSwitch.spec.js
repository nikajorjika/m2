import { mount } from '@vue/test-utils'
import SlideSwitch from '@/components/partials/SlideSwitch.vue'

const factory = () => {
  return mount(SlideSwitch, {
    mocks: {
      updateInput: jest.fn()
    }
  })
}

describe('SlideSwitch.js', () => {
  test('is a Vue instance', () => {
    const wrapper = factory()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('Test toggle working', () => {
    const wrapper = factory()
    wrapper.setProps({
      values: [
        {
          value: 'one',
          label: 'label'
        },
        {
          value: 'two',
          label: 'label'
        }
      ]
    })
    const updateInput = jest.fn()
    wrapper.setMethods({ updateInput })
    expect(wrapper.vm.value).toBe('one')
    wrapper.find('.switch__inner').trigger('click')
    expect(updateInput).toHaveBeenCalledTimes(1)
    wrapper.vm.updateInput()
    console.log(wrapper.emitted().input)
    expect(wrapper.emitted('input')).toBe(1)
    expect(wrapper.vm.value).toBe('two')
  })
})
