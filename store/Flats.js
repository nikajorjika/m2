export const state = () => ({
  areaList: [
    {
      label: 'labels.FullArea',
      value: '180 მ2'
    },
    {
      label: 'labels.FlatArea',
      value: '168 მ2'
    },
    {
      label: 'labels.BalconyArea',
      value: '12 მ2'
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
      area: '12.06 m2'
    },
    {
      label: 'rooms.Bedroom',
      area: '12.06 m2'
    },
    {
      label: 'rooms.Bedroom',
      area: '12.06 m2'
    },
    {
      label: 'rooms.Bedroom',
      area: '12.06 m2'
    },
    {
      label: 'rooms.Hall',
      area: '12.06 m2'
    },
    {
      label: 'rooms.Hall',
      area: '12.06 m2'
    },
    {
      label: 'rooms.Hall',
      area: '12.06 m2'
    }
  ]
})

export const getters = {
  priceList: (state) => state.priceList,
  areaList: (state) => state.areaList,
  roomsList: (state) => state.roomsList
}

export const mutations = {
  SET_TABLET_TYPE: (state, data) => {
    state.areaList = data
  }
}

export const actions = {}
