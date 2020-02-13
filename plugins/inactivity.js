export default function({ app, $axios, store }) {
  let interval
  const refresh = () => {
    clearInterval(interval)
    interval = setInterval(() => {
      app.$eventBus.$emit('inactive')
    }, 5 * 60 * 1000)
  }
  refresh()
  document.addEventListener('click', refresh)
}
