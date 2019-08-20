export const state = () => ({
  flatsData: [],
  flat: {},
  areaList: [
    {
      label: 'labels.FullArea',
      value: '180 მ²'
    },
    {
      label: 'labels.FlatArea',
      value: '168 მ²'
    },
    {
      label: 'labels.BalconyArea',
      value: '12 მ²'
    }
  ],
  priceList: [
    {
      label: 'labels.FullPrice',
      value: '58 000$'
    },
    {
      label: 'labels.Renovation',
      value: '8 000$'
    },
    {
      label: 'labels.Furniture',
      value: '8 000$'
    },
    {
      label: 'labels.Decor',
      value: '5 000$'
    },
    {
      label: 'labels.Supply',
      value: '8 000$'
    }
  ],
  roomsList: [
    {
      label: 'rooms.Hall',
      area: '12.06 მ²'
    },
    {
      label: 'rooms.Bedroom',
      area: '12.06 მ²'
    },
    {
      label: 'rooms.Bedroom',
      area: '12.06 მ²'
    },
    {
      label: 'rooms.Bedroom',
      area: '12.06 მ²'
    },
    {
      label: 'rooms.Hall',
      area: '12.06 მ²'
    },
    {
      label: 'rooms.Hall',
      area: '12.06 მ²'
    },
    {
      label: 'rooms.Hall',
      area: '12.06 მ²'
    },
    {
      label: 'rooms.Hall',
      area: '12.06 მ²'
    },
    {
      label: 'rooms.Bedroom',
      area: '12.06 მ²'
    },
    {
      label: 'rooms.Bedroom',
      area: '12.06 მ²'
    },
    {
      label: 'rooms.Bedroom',
      area: '12.06 მ²'
    },
    {
      label: 'rooms.Hall',
      area: '12.06 მ²'
    },
    {
      label: 'rooms.Hall',
      area: '12.06 მ²'
    },
    {
      label: 'rooms.Hall',
      area: '12.06 მ²'
    },
    {
      label: 'rooms.Hall',
      area: '12.06 მ²'
    },
    {
      label: 'rooms.Bedroom',
      area: '12.06 მ²'
    },
    {
      label: 'rooms.Bedroom',
      area: '12.06 მ²'
    },
    {
      label: 'rooms.Bedroom',
      area: '12.06 მ²'
    },
    {
      label: 'rooms.Hall',
      area: '12.06 მ²'
    },
    {
      label: 'rooms.Hall',
      area: '12.06 მ²'
    },
    {
      label: 'rooms.Hall',
      area: '12.06 მ²'
    }
  ]
})

export const getters = {
  priceList: (state) => state.priceList,
  areaList: (state) => state.areaList,
  roomsList: (state) => state.roomsList,
  flatsData: (state) => state.flatsData,
  flat: (state) => state.flat
}

export const mutations = {
  SET_TABLET_TYPE: (state, data) => {
    state.areaList = data
  },
  SET_FLATS_DATA: (state, data) => {
    state.flatsData = data
  },
  SET_FLAT_DATA: (state, data) => {
    state.flat = data
  }
}

export const actions = {
  fetchFlatData({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get('/renovation-flats')
        .then(({ data }) => {
          commit('SET_FLATS_DATA', data.data)
          resolve(data.data)
        })
        .catch((e) => reject(e))
    })
  },
  choseFlatFromFlats({ commit }, data) {
    console.log(data)
    commit('SET_FLAT_DATA', data)
  }
}
