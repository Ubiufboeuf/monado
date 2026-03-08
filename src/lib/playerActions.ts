export function toggleCinemaMode () {
  exitFullScreen()
  
  const { dataset } = document.documentElement
  const inCinemaMode = dataset.inCinemaMode === 'true'
  const newState = !inCinemaMode

  dataset.inCinemaMode = `${Boolean(newState)}`
  document.cookie = `monado-in-cinema-mode=${newState}; path=/; Secure; SameSite=Strict`
}

export function toggleFullScreen () {
  const container = document.querySelector('#player-container')
  const { fullscreenEnabled } = document

  if (!container || !fullscreenEnabled) return
  
  const inFullScreen = Boolean(document.fullscreenElement)
  if (inFullScreen) exitFullScreen()
  else enterFullScreen(container)
}

async function exitFullScreen () {
  try {
    await document.exitFullscreen()
  } catch {/* empty */}
  
  const newState = `${Boolean(document.fullscreenElement)}`
  document.documentElement.dataset.inFullScreen = newState
  const themeColor = document.querySelector('meta[name="theme-color"]')
  if (themeColor) themeColor.setAttribute('content', 'default')
  // setInFullScreen(newState)
}

async function enterFullScreen (element: Element) {
  try {
    await element.requestFullscreen()
    changeOrientation()
  } catch {/* empty */}

  const newState = `${Boolean(document.fullscreenElement)}`
  document.documentElement.dataset.inFullScreen = newState
  // <meta name="theme-color" content="default" />
  const themeColor = document.querySelector('meta[name="theme-color"]')
  if (themeColor) themeColor.setAttribute('content', 'black')
  // setInFullScreen(newState)
}

async function changeOrientation () {
  const { orientation } = window.screen
  if (!('lock' in orientation) || typeof orientation.lock !== 'function') return

  try {
    await orientation.lock('landscape')
  } catch {/* empty */}
}
