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
  subApp: '',
  currencyRate: null,
  currency: 'GEL'
})

export const getters = {
  tabletType: (state) => state.tabletType,
  subApp: (state) => state.subApp,
  currencyRate: (state) => state.currencyRate,
  currency: (state) => state.currency,
}

export const mutations = {
  SET_TABLET_TYPE: (state, data) => {
    state.tabletType = data
  },
  SET_SUB_APP: (state, data) => {
    state.subApp = data
  },
  SET: (state, {key, value}) => {
    state[key] = value
  }
}

export const actions = {
  fetchCurrencyValue({commit},currency) {
    return new Promise((resolve, reject) => {
      this.$axios.get(
        process.env.SERVER_IP.replace(/\/$/, '') +
          '/currency?currency=USD'
      ).then(({data}) => {
        commit('SET', {
          key: 'currencyRate',
          value: data
        })
      })
    })
  }
}