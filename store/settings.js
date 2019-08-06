export const state = () => ({
  tabletType: '',
  tabletTypes: [
    {
      name: 'რემონტები',
      value: 'renovation',
      sub_items: [1, 2, 3, 4]
    },
    {
      name: 'მაგიდები',
      value: 'tables',
      sub_items: [1, 2, 3, 4]
    },
    {
      name: 'მაკეტი',
      value: 'tables',
      sub_items: [1, 2, 3, 4]
    }
  ]
})

export const getters = {
  tabletType: (state) => state.tabletType
}

export const mutations = {
  SET_TABLET_TYPE: (state, data) => {
    state.tabletType = data
  }
}

export const actions = {}
