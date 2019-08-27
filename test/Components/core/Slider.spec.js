import { shallowMount, createLocalVue } from '@vue/test-utils'
import Sidebar from '@/components/core/Slider.vue'

describe('FlatView.vue', () => {
  const localVue = createLocalVue()
  localVue.directive('swiper', () => {})
  const factory = () => {
    return shallowMount(Sidebar, {
      mocks: {
        mySwiper: {
          slideNext: jest.fn(),
          slidePrev: jest.fn(),
          activeIndex: 0
        }
      },
      propsData: {
        items: []
      },
      localVue
    })
  }

  test('Is vue instance', () => {
    const wrapper = factory()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('Fires next slide callback', () => {
    const wrapper = factory()
    wrapper.setMethods({ nextSlide: jest.fn() })
    wrapper.find('.swiper__pagination__button--next').trigger('click')
    expect(wrapper.vm.nextSlide).toHaveBeenCalledTimes(1)
  })

  test('Fires prev slide callback', () => {
    const wrapper = factory()
    wrapper.setMethods({ prevSlide: jest.fn() })
    wrapper.find('.swiper__pagination__button--prev').trigger('click')
    expect(wrapper.vm.prevSlide).toHaveBeenCalledTimes(1)
  })

  test('Is {prevSlide} Function working properly', () => {
    const wrapper = factory()
    wrapper.vm.prevSlide()
    expect(wrapper.vm.mySwiper.slidePrev).toHaveBeenCalledTimes(1)
  })
  test('Is {nextSlide} Function working properly', () => {
    const wrapper = factory()
    wrapper.vm.nextSlide()
    expect(wrapper.vm.mySwiper.slideNext).toHaveBeenCalledTimes(1)
  })
  test('Is {sendMessageToParent} is emitting event', () => {
    const wrapper = factory()
    wrapper.vm.sendMessageToParent()
    expect(wrapper.emitted('messageFromSlider')[0][0]).toEqual(
      wrapper.vm.mySwiper.activeIndex
    )
  })
})
