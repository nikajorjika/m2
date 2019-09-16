export const state = () => ({
  flats: [],
  filters: {
    block: null,
    floors: {
      min: 1,
      max: 25
    },
    price: {
      min: 20000,
      max: 150000
    },
    view: []
  },
  flatNumber: '',
  filterLoading: false,
  filteredTotalCount: 0,
  customColor: ''
})

export const getters = {
  flats: (state) => state.flats,
  filters: (state) => state.filters,
  view: (state) => state.filters.view,
  totalCount: (state) => state.filteredTotalCount,
  filterLoading: (state) => state.filterLoading
}

export const mutations = {
  SET_FLATS_DATA: (state, data) => {
    state.flats = data
  },
  SET_TOTAL_COUNT: (state, data) => {
    state.filteredTotalCount = data
  },
  SET_FILTER_LOADER: (state, status) => {
    state.filterLoading = status
  },
  SET_FILTER_ITEM: (state, { key, value }) => {
    if (state.filters.hasOwnProperty(key)) {
      state.filters[key] = value
    }
  }
}

export const actions = {
  fetchFilteredFlats({ commit, getters }) {
    commit('SET_FILTER_LOADER', true)
    return new Promise((resolve, reject) => {
      const { block, floors, price, view } = getters.filters
      this.$axios
        .get('/flats', {
          params: {
            block_id: block,
            max_price: price.max,
            min_price: price.min,
            max_floor: floors.max,
            min_floor: floors.min,
            view_id: view
          }
        })
        .then(({ data }) => {
          commit('SET_FLATS_DATA', data.data)
          commit('SET_TOTAL_COUNT', data.meta.total)
          resolve(data.data)
          commit('SET_FILTER_LOADER', false)
        })
        .catch((e) => reject(e))
    })
  },
  fetchByFlatNumber(context, flatNumber) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get('/flats', {
          params: { flat_number: flatNumber }
        })
        .then(({ data }) => {
          context.commit('SET_FLATS_DATA', data.data)
          resolve(data.data)
        })
        .catch((e) => reject(e))
    })
  },
  lightUpFlat(context, flatNumber) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('http://10.200.22.30/LocalServices/api/selected')
        .then((response) => {
          setTimeout(() => {
            context.dispatch('inactivityReset')
            resolve(response)
          }, 3000)
        })
    })
  },
  inactivityReset(context) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('http://10.200.22.30/LocalServices/api/noAction')
        .then((response) => {
          resolve(response)
        })
    })
  }
}
