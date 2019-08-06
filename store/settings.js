export const state = () => ({
  tabletType: '',
  tabletTypes: [
    {
      name: ''
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
