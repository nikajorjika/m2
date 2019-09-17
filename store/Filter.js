export const state = () => ({
  flats: [],
  filters: {
    block: null,
    floors: {
      min: 0,
      max: 25
    },
    price: {
      min: 20000,
      max: 150000
    },
    view: []
  },
  filterDefaults: {
    min_floor: 1,
    max_floor: 24,
    max_price: 20000,
    min_price: 150000,
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
  filterDefaults: (state) => state.filterDefaults,
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
  SET_FILTER_DEFAULTS: (state, data) => {
    state.filterDefaults = data
    state.filters.floors.min = data.min_floor
    state.filters.floors.max = data.max_floor
    state.filters.price.max = data.max_price
    state.filters.price.min = data.min_price
  },
  SET_FILTER_ITEM: (state, { key, value }) => {
    if (state.filters.hasOwnProperty(key)) {
      state.filters[key] = value
    }
  },
  SET_FILTER_VIEWS: (state, views) => {
    state.filters.view = views
  }
}

export const actions = {
  fetchFilteredFlats({ commit, getters }) {
    commit('SET_FILTER_LOADER', true)
    return new Promise((resolve, reject) => {
      const { block, floors, price } = getters.filters
      const views = getters.filters.view.map((item) => item.value)
      const params = {
        block_id: block,
        max_price: price.max,
        min_price: price.min,
        max_floor: floors.max,
        min_floor: floors.min
      }
      if (views) {
        params.view_ides = views
      }
      this.$axios
        .get('/flats', { params })
        .then(({ data }) => {
          commit('SET_FLATS_DATA', data.data)
          resolve(data.data)
          commit('SET_FILTER_LOADER', false)
        })
        .catch((e) => reject(e))
    })
  },

  fetchFilteredDataCount({ commit, getters }) {
    const { block, floors, price } = getters.filters
    const views = getters.filters.view.map((item) => item.value)
    const params = {
      block_id: block,
      max_price: price.max,
      min_price: price.min,
      max_floor: floors.max,
      min_floor: floors.min
    }
    if (views) {
      params.view_ides = views
    }
    return new Promise((resolve, reject) => {
      this.$axios.get('/flats/filtered/count', { params }).then(({ data }) => {
        commit('SET_TOTAL_COUNT', data.count)
        resolve(data)
      })
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
  fetchFilterDefaults(context) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get('/flats/info')
        .then(({ data }) => {
          context.commit('SET_FILTER_DEFAULTS', data)
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
