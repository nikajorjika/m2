export const GoInFullscreen = (element) => {
  if (element.requestFullscreen) element.requestFullscreen()
  else if (element.mozRequestFullScreen) element.mozRequestFullScreen()
  else if (element.webkitRequestFullscreen) element.webkitRequestFullscreen()
  else if (element.msRequestFullscreen) element.msRequestFullscreen()
}

if (process.browser) {
  const element = window.document.getElementById('__nuxt')
  window.onNuxtReady(() => {
    GoInFullscreen(element)
  })
}
