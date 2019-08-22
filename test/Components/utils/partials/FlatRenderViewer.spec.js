import { shallowMount, createLocalVue } from '@vue/test-utils'
import FlatRenderViewer from '@/components/partials/FlatRenderViewer.vue'

const localVue = createLocalVue()

const factory = () => {
  return shallowMount(FlatRenderViewer, {
    mocks: {
      $t: () => {}
    },
    localVue
  })
}

describe('FlatRenderViewer.vue', () => {
  test('is a Vue instance', () => {
    const wrapper = factory()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
