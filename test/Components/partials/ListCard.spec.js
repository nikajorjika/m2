import { shallowMount } from '@vue/test-utils'
import ListCard from '@/components/partials/ListCard.vue'

const factory = () => {
  return shallowMount(ListCard, {
    mocks: {
      $t: (value) => value
    },
    propsData: {
      items: [{ data: 12 }, { data: 12 }]
    }
  })
}

describe('ListCard.vue', () => {
  test('is a Vue instance', () => {
    const wrapper = factory()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('Props are set correctly', () => {
    const cmp = factory()
    const props = cmp.vm.$options.props
    expect(props.items.type).toBe(Array)
    expect(Array.isArray(props.items.default())).toBe(true)
    expect(props.listStyle.type).toBe(String)
    expect(props.listStyle.default).toBe('white')
  })
  test('filteredItems are filtered correctly', () => {
    const wrapper = factory()
    expect(wrapper.vm.filteredItems).toEqual([{ data: 12 }, { data: 12 }])
  })
})
