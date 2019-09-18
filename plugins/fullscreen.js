export const GoInFullscreen = () => {
  document.documentElement.requestFullscreen()
}

if (process.browser) {
  GoInFullscreen()
}
