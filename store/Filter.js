export const state = () => ({
  flats: [],
  presets: [],
  chosenBlockNumber: null,
  showFloorFooter: false,
  loadingCount: true,
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
    flat_number: null,
    building_progress: [],
    bedroom_count: [],
    wc: null,
    area: {
      min: null,
      max: null
    },
    type: null
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
    ],
    Animate:true
  },
  showPrompt: {
    show: false,
    text: null,
    color: null
  },
  filterDefaults: {
    block: null,
    min_floor: null,
    max_floor: null,
    max_price: null,
    min_price: null,
    view: [],
    flat_number: null
  },
  flatNumber: null,
  filterLoading: true,
  filteredTotalCount: 0,
  blocks: [],
  customColor: ''
})

export const getters = {
  flats: (state) => state.flats,
  filters: (state) => state.filters,
  presets: (state) => state.presets,
  loadingCount: (state) => state.loadingCount,
  blocks: (state) => state.blocks,
  view: (state) => state.filters.view,
  totalCount: (state) => state.filteredTotalCount,
  filterDefaults: (state) => state.filterDefaults,
  chosenBlockNumber: (state) => state.chosenBlockNumber,
  filterLoading: (state) => state.filterLoading,
  flatNumber: (state) => state.filterLoading,
  showFloorFooter: (state) => state.showFloorFooter,
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
    state.filters.block = null
    state.filters.view = []
    state.filters.flat_number = null
    state.filters.building_progress = []
    state.filters.bedroom_count = data.hasOwnProperty('bedroom_count') ? data.bedroom_count : []
    state.filters.type = data.hasOwnProperty('type') && data.type ? data.type : null
    state.filters.wc = data.hasOwnProperty('wc') && data.wc ? data.wc : null
  },
  SET_CHOSEN_BLOCK: (state, data) => {
    state.chosenBlockNumber = data
  },
  SET_FILTERS_BULK: (state, data) => {
    state.filters = {
      block: data.hasOwnProperty('block') ? data.block : null,
      floors: {
        min: data.min_floor,
        max: data.max_floor
      },
      price: {
        min: data.min_price,
        max: data.max_price
      },
      view: data.hasOwnProperty('view') ? data.view : [],
      bedroom_count: data.hasOwnProperty('bedroom_count') ? data.bedroom_count : [],
      building_progress: data.hasOwnProperty('building_progress') ? data.building_progress : [],
      type: data.hasOwnProperty('type') && data.type ? data.type : null,
      wc: data.hasOwnProperty('wc') && data.wc ? data.wc : null
    }
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
      ],
      Animate:true
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
      ],
      Animate:true
    }
  },
  SET_FILTER_ITEM: (state, { key, value }) => {
    if (state.filters.hasOwnProperty(key)) {
      state.filters[key] = value
    }
  },
  SET_FILTER_VIEWS: (state, views) => {
    state.filters.view = views
  },
  SET: (state, {key, value}) => {
    state[key] = value
  }
}

export const actions = {
  fetchFilteredFlats({ commit, getters }, { page, fresh, noLoading }) {
    if(!noLoading) {
      commit('SET_FILTER_LOADER', true)
    }
    fresh && commit('SET_FLATS_DATA', [])
    
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line camelcase
      const {
        block,
        floors,
        price,
        // eslint-disable-next-line camelcase
        flat_number,
        // eslint-disable-next-line camelcase
        bedroom_count,
        type,
        // wc,
        // eslint-disable-next-line camelcase
        building_progress
      } = getters.filters
      const views = getters.filters.view.map((item) => item.value)
      const bedroomCount = bedroom_count.map((item) => item.hasOwnProperty('value') ? item.value : parseInt(item) )
      const params = {
        block_id: block,
        max_price: price.max,
        min_price: price.min,
        max_floor: floors.max,
        min_floor: floors.min,
        bedroom_count: bedroomCount,
        type,
        // wc,
        building_progress,
        flat_number,
        page
      }
      if (views) {
        params.view_ides = views
      }
      this.$axios
        .get('/flats', { params })
        .then(({ data }) => {
          if(fresh === undefined || fresh === false) {
            commit('UPPEND_FLATS_DATA', data.data)
          }else {
            commit('SET_FLATS_DATA', data.data)
          }
          if(!noLoading) {
            commit('SET_FILTER_LOADER', false)
          }
          resolve(data.data)
        })
        .catch((e) => reject(e))
    })
  },

  fetchFilteredDataCount({ commit, getters }) {
    commit('SET', {key: 'loadingCount', value: true})
    // eslint-disable-next-line camelcase
    const {
      block,
      floors,
      price,
      // eslint-disable-next-line camelcase
      flat_number,
      // eslint-disable-next-line camelcase
      bedroom_count,
      type,
      // wc,
      // eslint-disable-next-line camelcase
      building_progress
    } = getters.filters
    const views = getters.filters.view.map((item) => item.value)
    const bedroomCount = bedroom_count.map((item) => item.hasOwnProperty('value') ? item.value : parseInt(item) )
    const params = {
      block_id: block,
      max_price: price.max,
      min_price: price.min,
      max_floor: floors.max,
      min_floor: floors.min,
      bedroom_count: bedroomCount,
      type,
      // wc,
      building_progress,
      flat_number
    }
    if (views) {
      params.view_ides = views
    }
    return new Promise((resolve, reject) => {
      this.$axios.get('/flats/filtered/count', { params }).then(({ data }) => {
        commit('SET_TOTAL_COUNT', data.count)
        commit('SET', {key: 'loadingCount', value: false})
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
  fetchFiltersInfo({commit}) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get('/flats/info')
        .then(({ data }) => {
          commit('SET', {
            key: 'filterDefaults',
            value: data
          })
          resolve(data)
        })
        .catch((e) => reject(e))
    })
  },
  lightUpFlat(context, flats) {
    return new Promise((resolve, reject) => {
      // context.commit('SET_MODEL_API_DATA', flats)
      const tabletId = this.$cookies.get('paveleon-planshet')
      const formattedFlats = flats.map((item) => {
        return {
          block: item.block,
          id: item.id
        }
      })
      this.$axios
        .post('model/light/on', {
          tabletId: tabletId,
          flats: formattedFlats
        })
        .then((response) => {
          setTimeout(() => {
            context.dispatch('inactivityReset', formattedFlats)
            resolve(response)
          }, 10000)
          resolve(true)
        })
    })
  },
  inactivityReset(context, flats) {
    const data = {
      flats
    }
    return new Promise((resolve, reject) => {
      this.$axios
        .post('model/light/off', data)
        .then((response) => {
          resolve(response)
        })
    })
  }
}
