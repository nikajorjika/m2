import { mount } from '@vue/test-utils'
import FlatNavigation from '@/components/core/FlatNavigation.vue'

describe('FlatNavigation.vue', () => {
  const factory = () => {
    return mount(FlatNavigation, {
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
})
