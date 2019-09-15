export const state = () => ({
  flats: [],
  filters: {
    block: null,
    floors: [],
    price: {
      min: 20000,
      max: 150000
    },
    view: []
  }
})

export const getters = {
  flats: (state) => state.flats,
  filters: (state) => state.filters,
  view: (state) => state.filters.view
}

export const mutations = {
  SET_FLATS_DATA: (state, data) => {
    state.flats = data
  },
  SET_FILTER_ITEM: (state, { key, value }) => {
    if (state.filters.hasOwnProperty(key)) {
      state.filters[key] = value
    }
  }
}

export const actions = {
  fetchFilteredFlats(context) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get('/flats', { params: context.getters.filters })
        .then(({ data }) => {
          context.commit('SET_FLATS_DATA', data.data)
          resolve(data.data)
        })
        .catch((e) => reject(e))
    })
  }
}
