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
  modelApiData: {
    TabletId: null,
    block: [
      {
        BlockId: 'A',
        Apartments: []
      },
      {
        BlockId: 'B',
        Apartments: []
      },
      {
        BlockId: 'C',
        Apartments: []
      }
    ]
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
  filterLoading: (state) => state.filterLoading,
  modelApiData: (state) => state.modelApiData
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
  // eslint-disable-next-line object-shorthand
  SET_MODEL_API_DATA: function(state, flats) {
    state.modelApiData.TabletId = this.$cookies.get('paveleon-planshet')
    flats.map((item) => {
      state.modelApiData.block[parseInt(item.block) - 1].Apartments.push({
        ApartmentId: item.flat_number
      })
    })
  },
  RESET_MODEL_API_DATA: (state) => {
    state.modelApiData = {
      TabletId: null,
      block: [
        {
          BlockId: 'A',
          Apartments: []
        },
        {
          BlockId: 'B',
          Apartments: []
        },
        {
          BlockId: 'C',
          Apartments: []
        }
      ]
    }
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
  lightUpFlat(context, flats) {
    return new Promise((resolve, reject) => {
      context.commit('SET_MODEL_API_DATA', flats)
      this.$axios({
        method: 'post',
        url: 'http://10.200.22.28/LocalServices/api/selected',
        headers: {},
        data: [context.getters.modelApiData]
      }).then((response) => {
        setTimeout(() => {
          context.dispatch('inactivityReset')
          resolve(response)
        }, 20000)
      })
    })
  },
  inactivityReset(context) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(
          'http://10.200.22.28/LocalServices/api/chamaqre',
          context.getters.modelApiData
        )
        .then((response) => {
          context.commit('RESET_MODEL_API_DATA')
          resolve(response)
        })
    })
  }
}
