let run = false

export default function({ app }) {
  if (!run) {
    app.router.beforeEach((to, from, next) => {
      run = true

      const pattern = new RegExp(
        '^\\/((?:[^\\/]+?))\\/sales\\/customize\\/((?:[^\\/]+?))(?:\\/(?=$))?(\\/(makeover|furniture|decoration|appliance))*(\\/)?$',
        'i'
      )

      if (pattern.test(from.fullPath)) {
        if (!pattern.test(to.fullPath)) {
          if (!to.query.redirect) {
            const modalData = {
              path: app.$router.history.pending.fullPath,
              query: { redirect: 1 }
            }

            app.$eventBus.$emit(
              'openModal',
              'modal-content-save-flat',
              modalData
            )

            return next(false)
          }
        }
      }

      next()
    })
  }
}
