import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import FlatRenderViewer from '@/components/partials/FlatRenderViewer.vue'

const localVue = createLocalVue()
let store
const renderImage = 'https://placehold.it/10x10'
const planImage = 'https://placehold.it/10x12'
localVue.use(Vuex)
const factory = () => {
  return shallowMount(FlatRenderViewer, {
    mocks: {
      $t: () => {},
      $store: store
    },
    localVue
  })
}

describe('FlatRenderViewer.vue', () => {
  beforeEach(() => {
    store = new Vuex.Store({
      getters: {
        locale: () => 'en'
      }
    })
  })

  test('is a Vue instance', () => {
    const wrapper = factory()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  test('Maximize image is passed correctly', () => {
    const wrapper = factory()
    wrapper.setProps({
      bedroomCount: '2',
      renderImage,
      planImage
    })
    expect(wrapper.vm.imageToMaximize).toBe(renderImage)
    wrapper.setData({ switchValue: true })
    expect(wrapper.vm.imageToMaximize).toBe(planImage)
    wrapper.setData({ switchValue: false })
    expect(wrapper.vm.imageToMaximize).toBe(renderImage)
  })
})
