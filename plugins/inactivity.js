export default function({ app, $axios, store }) {
  let interval
  const refresh = () => {
    clearInterval(interval)
    interval = setInterval(() => {
      app.$eventBus.$emit('inactive')
    }, 20 * 60 * 1000)
    // }, 10 * 1000)
  }
  refresh()
  document.addEventListener('click', refresh)
}
