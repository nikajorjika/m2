import { shallowMount, createLocalVue } from '@vue/test-utils'
import RoomListComponent from '@/components/partials/RoomListComponent.vue'

const localVue = createLocalVue()

localVue.directive('swiper', () => {})
const factory = () => {
  return shallowMount(RoomListComponent, {
    mocks: {
      $t: (value) => value,
      sliceUpArray: jest.fn(),
      turnToLeadingZero: jest.fn()
    },
    localVue
  })
}

describe('Description.vue', () => {
  test('is a Vue instance', () => {
    const wrapper = factory()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  test('Items are generated correctly', () => {
    const wrapper = factory()
    wrapper.setProps({ roomList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] })
    expect(wrapper.vm.items.length).toBe(2)

    wrapper.setProps({ roomList: [1, 2, 3, 4, 5] })
    expect(wrapper.vm.items.length).toBe(1)

    wrapper.setProps({
      roomList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8]
    })
    expect(wrapper.vm.items.length).toBe(2)

    wrapper.setProps({ roomList: [] })
    expect(wrapper.vm.items.length).toBe(0)
  })
})
