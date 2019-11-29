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
            app.$eventBus.$emit('openModal', 'modal-content-save-flat')

            return next(false)
          }
        }
      }

      next()
    })
  }
}
