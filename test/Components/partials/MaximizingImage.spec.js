import { shallowMount } from '@vue/test-utils'
import MaximizingImage from '@/components/partials/MaximizingImage.vue'

const store = {
  $store: {
    commit: jest.fn()
  }
}

const factory = () => {
  return shallowMount(MaximizingImage, {
    mocks: store
  })
}

describe('Description.vue', () => {
  test('is a Vue instance', () => {
    const wrapper = factory()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('Click works correctly', () => {
    const wrapper = factory()
    wrapper.setMethods({ handleClick: jest.fn() })
    wrapper.find('.maximize__icon').trigger('click')

    expect(wrapper.vm.handleClick).toHaveBeenCalledTimes(1)
  })

  it('Method:{handleClick} calls commit correctly', () => {
    const wrapper = factory()
    wrapper.vm.handleClick()
    expect(store.$store.commit).toHaveBeenCalledTimes(1)
  })

  it('Props are set correctly', () => {
    const wrapper = factory()
    const props = wrapper.vm.$options.props

    expect(props.image.type).toBe(String)
    expect(props.image.default).toBe('')
    expect(props.image.required).toBe(false)

    expect(props.bgColor.type).toBe(String)
    expect(props.bgColor.default).toBe('#f26529')

    expect(props.width.type).toBe(String)
    expect(props.width.default).toBe('18')

    expect(props.iconWidth.type).toStrictEqual([Number, String])
    expect(props.iconWidth.default).toBe(18)

    expect(props.iconHeight.type).toStrictEqual([Number, String])
    expect(props.iconHeight.default).toBe(18)

    expect(props.iconColor.type).toBe(String)
    expect(props.iconColor.default).toBe('#fff')

    expect(props.opacity.type).toBe(String)
    expect(props.opacity.default).toBe('0.5')

    expect(props.isActive.type).toBe(Boolean)
    expect(props.isActive.default).toBe(false)

    expect(wrapper.vm.open).toBe(false)
  })
})
