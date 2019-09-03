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
  ],
  apiUrl: `${process.env.SERVER_IP}/${process.env.API_PATH}`,
  subApp: ''
})

export const getters = {
  tabletType: (state) => state.tabletType,
  subApp: (state) => state.subApp
}

export const mutations = {
  SET_TABLET_TYPE: (state, data) => {
    state.tabletType = data
  },
  SET_SUB_APP: (state, data) => {
    state.subApp = data
  }
}

export const actions = {}
