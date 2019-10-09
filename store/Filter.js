export const state = () => ({
  flats: [],
  presets: [],
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
    view: [],
    flat_number: null
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
  showPrompt: {
    show: false,
    text: null,
    color: null
  },
  filterDefaults: {
    min_floor: null,
    max_floor: null,
    max_price: null,
    min_price: null,
    view: [],
    flat_number: null
  },
  flatNumber: null,
  filterLoading: false,
  filteredTotalCount: 0,
  customColor: ''
})

export const getters = {
  flats: (state) => state.flats,
  filters: (state) => state.filters,
  presets: (state) => state.presets,
  view: (state) => state.filters.view,
  totalCount: (state) => state.filteredTotalCount,
  filterDefaults: (state) => state.filterDefaults,
  filterLoading: (state) => state.filterLoading,
  flatNumber: (state) => state.filterLoading,
  modelApiData: (state) => state.modelApiData,
  showPrompt: (state) => state.showPrompt
}

export const mutations = {
  SET_FLATS_DATA: (state, data) => {
    state.flats = data
  },
  SET_FILTER_PRESETS: (state, payload) => {
    state.presets = payload
  },
  UPPEND_FLATS_DATA: (state, data) => {
    state.flats = [...state.flats, ...data]
  },
  SET_PROMPT_DATA: (state, { text, color, show }) => {
    state.showPrompt = { text, color, show }
  },
  SET_TOTAL_COUNT: (state, data) => {
    state.filteredTotalCount = data
  },
  SET_FILTER_LOADER: (state, status) => {
    state.filterLoading = status
  },
  SET_FLAT_NUMBER: (state, flatNumber) => {
    state.filters.flat_number = flatNumber
  },
  SET_FILTER_DEFAULTS: (state, data) => {
    state.filterDefaults = data
    state.filters.floors.min = data.min_floor
    state.filters.floors.max = data.max_floor
    state.filters.price.max = data.max_price
    state.filters.price.min = data.min_price
    state.filters.view = []
  },
  // eslint-disable-next-line object-shorthand
  SET_MODEL_API_DATA: function(state, flats) {
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
  fetchFilteredFlats({ commit, getters }, { page }) {
    commit('SET_FILTER_LOADER', true)
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line camelcase
      const { block, floors, price, flat_number } = getters.filters
      const views = getters.filters.view.map((item) => item.value)
      const params = {
        block_id: block,
        max_price: price.max,
        min_price: price.min,
        max_floor: floors.max,
        min_floor: floors.min,
        flat_number,
        page
      }
      if (views) {
        params.view_ides = views
      }
      this.$axios
        .get('/flats', { params })
        .then(({ data }) => {
          commit('UPPEND_FLATS_DATA', data.data)
          resolve(data.data)
          commit('SET_FILTER_LOADER', false)
        })
        .catch((e) => reject(e))
    })
  },

  fetchFilteredDataCount({ commit, getters }) {
    // eslint-disable-next-line camelcase
    const { block, floors, price, flat_number } = getters.filters
    const views = getters.filters.view.map((item) => item.value)
    const params = {
      block_id: block,
      max_price: price.max,
      min_price: price.min,
      max_floor: floors.max,
      min_floor: floors.min,
      flat_number
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

  fetchFilterPresets({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get('filter-presets')
        .then(({ data }) => {
          commit('SET_FILTER_PRESETS', data.data)
          resolve(data.data)
        })
        .catch((error) => console.error(error))
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
          context.commit('SET_FLAT_NUMBER', flatNumber)
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
          resolve(data)
        })
        .catch((e) => reject(e))
    })
  },
  lightUpFlat(context, flats) {
    return new Promise((resolve, reject) => {
      context.commit('SET_MODEL_API_DATA', flats)
      this.$axios
        .post('http://10.200.22.28/LocalServices/api/selected', [
          context.getters.modelApiData
        ])
        .then((response) => {
          const timeout = setTimeout(() => {
            context.dispatch('inactivityReset')
            resolve(response)
          }, 10000)
          resolve(timeout)
        })
    })
  },
  inactivityReset(context) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('http://10.200.22.28/LocalServices/api/chamaqre', [
          context.getters.modelApiData
        ])
        .then((response) => {
          context.commit('RESET_MODEL_API_DATA')
          resolve(response)
        })
    })
  }
}
