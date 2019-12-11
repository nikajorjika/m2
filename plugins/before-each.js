export default function({ app, store }) {
  app.router.beforeEach((to, from, next) => {
    const pattern = new RegExp(
      '^\\/((?:[^\\/]+?))\\/sales\\/customize\\/((?:[^\\/]+?))(?:\\/(?=$))?(\\/(makeover|furniture|decoration|appliance))*(\\/)?$',
      'i'
    )

    // Check page

    if (pattern.test(from.fullPath)) {
      if (!pattern.test(to.fullPath)) {
        if (!to.query.redirect) {
          // Compare states

          if (!isObjectsEqual(configs(store), prevConfigs(store))) {
            const redirect = from.name !== 'lang-sales-waiting' ? 1 : 0
            const modalData = {
              location: {
                path: to.fullPath,
                query: { redirect }
              }
            }

            // Open modal

            app.$eventBus.$emit(
              'openModal',
              'modal-content-save-flat',
              modalData
            )

            app.$eventBus.$on('continue', () => {
              next()
            })
            return next(false)
          }
        }
      }
    }

    next()
  })

  /**
   * Get current state.
   *
   * @param store
   * @returns {{decoration_id: *, flat_id: (*|null), furniture_id: *, appliances_ids: *, renovation_id: *}}
   */
  const configs = (store) => {
    const flat = store.getters['customize/flat']

    return {
      flat_id: flat && flat.id ? flat.id : null,
      renovation_id: store.getters['customize/renovationId'],
      furniture_id: store.getters['customize/furnitureId'],
      decoration_id: store.getters['customize/decorationId'],
      appliances_ids: store.getters['customize/appliancesIds']
    }
  }

  /**
   * Get previous state.
   *
   * @param store
   * @returns {*}
   */
  const prevConfigs = (store) => {
    return store.getters['customize/configurations']
  }

  /**
   * Compare objects.
   *
   * @param first
   * @param second
   * @returns {boolean}
   */
  const isObjectsEqual = (first, second) => {
    const firstKeys = Object.keys(first)
    const secondKeys = Object.keys(second)

    if (firstKeys.length !== secondKeys.length) {
      return false
    }

    let firstKey

    for (firstKey of firstKeys) {
      if (first[firstKey] !== second[firstKey]) {
        return false
      }
    }

    return true
  }
}
