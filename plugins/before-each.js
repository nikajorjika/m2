export default function({ app }) {
  app.router.beforeEach((to, from, next) => {
    const pattern = new RegExp(
      '^\\/((?:[^\\/]+?))\\/sales\\/customize\\/((?:[^\\/]+?))(?:\\/(?=$))?(\\/(makeover|furniture|decoration|appliance))*(\\/)?$',
      'i'
    )

    if (pattern.test(from.fullPath)) {
      if (!pattern.test(to.fullPath)) {
        if (!to.query.redirect) {
          const modalData = {
            location: {
              path: to.fullPath,
              query: { redirect: 1 }
            }
          }

          app.$eventBus.$emit('openModal', 'modal-content-save-flat', modalData)

          return next(false)
        }
      }
    }

    next()
  })
}
