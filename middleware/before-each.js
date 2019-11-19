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
          app.$eventBus.$emit('openModal')

          return next(false)
        }
      }

      next()
    })
  }
}
