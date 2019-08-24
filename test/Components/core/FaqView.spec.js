import { mount } from '@vue/test-utils'
import FaqView from '@/components/core/FaqView.vue'
describe('FaqView.vue', () => {
  const factory = () => {
    return mount(FaqView, {
      mocks: {
        $t: (text) => text,
        $router: {
          go: jest.fn()
        }
      }
    })
  }

  test('Is vue instance', () => {
    const wrapper = factory()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('Is {goBack} function calling for Router go(-1)', () => {
    const wrapper = factory()
    wrapper.vm.goBack()
    expect(wrapper.vm.$router.go).toHaveBeenCalledTimes(1)

    // If wrapper go param is back
    expect(wrapper.vm.$router.go.mock.calls[0][0]).toBe(-1)
  })
})
