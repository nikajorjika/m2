import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import LanguageSwitcher from '@/components/core/LanguageSwitcher.vue'

describe('FlatView.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const store = new Vuex.Store({
    getters: {
      locale: () => 'en',
      allLocales: () => ['en', 'ka']
    }
  })
  const push = jest.fn()
  const factory = () => {
    return shallowMount(LanguageSwitcher, {
      mocks: {
        $router: {
          push
        },
        $route: {
          name: 'index',
          params: {
            lang: 'en'
          }
        },
        $t: (item) => item
      },
      localVue,
      store
    })
  }

  test('Is vue instance', () => {
    const wrapper = factory()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('Is {opositeLocale} set correctly', () => {
    const wrapper = factory()
    expect(wrapper.vm.opositeLocale).toBe('ka')
  })
  test('Is {.switcher__item} click firing {toggleLanguage}', () => {
    const wrapper = factory()
    const clickFn = jest.fn()
    wrapper.setMethods({ toggleLanguage: clickFn })
    wrapper.find('.switcher__item').trigger('click')
    expect(wrapper.vm.toggleLanguage).toHaveBeenCalledTimes(1)
  })
  test('Is {toggleLanguage} function redirecting to proper url', () => {
    const wrapper = factory()
    wrapper.vm.toggleLanguage()
    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1)
  })
})
