export default function({ app, store }) {
  /**
   * Run this function for each page.
   */
  app.router.beforeEach((to, from, next) => {
    // Pattern to test pages against.

    const pattern = new RegExp(
      '^\\/((?:[^\\/]+?))\\/sales\\/customize\\/((?:[^\\/]+?))(?:\\/(?=$))?(\\/(makeover|furniture|decoration|appliance))*(\\/)?$',
      'i'
    )

    // Check page if we are on flat configurations pages

    if (
      pattern.test(from.fullPath) &&
      !pattern.test(to.fullPath) &&
      !to.query.redirect
    ) {
      // Compare states to detect if flat configuration is updated during navigation

      isObjectsEqual(configs(store), prevConfigs(store)).then((equal) => {
        if (!equal) {
          const redirect = from.name !== 'lang-sales-waiting' ? 1 : 0
          const modalData = {
            location: {
              path: to.fullPath,
              query: { redirect }
            }
          }

          // Open modal to suggest flat saving

          app.$eventBus.$emit('openModal', 'modal-content-save-flat', modalData)

          // Direct redirect

          app.$eventBus.$on('continue', () => {
            next()
          })

          // Prevent redirect

          return next(false)
        } else {
          next()
        }
      })
    } else {
      next()
    }
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
  const isObjectsEqual = async (first, second) => {
    const firstKeys = Object.keys(first)
    const secondKeys = Object.keys(second)

    if (firstKeys.length !== secondKeys.length) {
      return false
    }

    let firstKey

    for (firstKey of firstKeys) {
      const a = await first[firstKey]
      const b = await second[firstKey]

      if (a !== b) {
        return false
      }
    }

    return true
  }
}
