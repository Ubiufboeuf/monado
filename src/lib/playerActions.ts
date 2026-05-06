import { usePlayerStore } from '@/stores/usePlayerStore'
import { TIME_TO_HIDE_CONTROLS } from './constants'
import { debounce } from './utils'

export async function togglePlayState () {
  const { element: video, setIsPlaying } = usePlayerStore.getState()
  if (!video) return

  const isPaused = video.paused === true
  if (isPaused) await video.play()
  else video.pause()

  const isNowPaused = video.paused
  setIsPlaying(!isNowPaused)
}

export function checkPlayState () {
  const { element, firstPlay, setFirstPlay, isPlaying, setIsPlaying, duration, setDuration } = usePlayerStore.getState()
  if (!element || !firstPlay || isPlaying === !element.paused) return
  setIsPlaying(!element.paused)
  setFirstPlay(false)
  showControlsAndScheduleHide()

  if (duration !== element.duration) {
    setDuration(element.duration)
  }
}

export function toggleCinemaMode () {
  exitFullScreen()
  
  const { setInCinemaMode } = usePlayerStore.getState()

  const { dataset } = document.documentElement
  const inCinemaMode = dataset.inCinemaMode === 'true'
  const newState = !inCinemaMode

  dataset.inCinemaMode = `${Boolean(newState)}`
  document.cookie = `monado-in-cinema-mode=${newState}; path=/; Secure; SameSite=Strict`
  setInCinemaMode(newState)
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

export function backwardTime () {
  const { element } = usePlayerStore.getState()
  if (!element) return

  element.currentTime -= 5
}

export function forwardTime () {
  const { element } = usePlayerStore.getState()
  if (!element) return

  element.currentTime += 5
}

export function updateCurrentTime () {
  const { element: video } = usePlayerStore.getState()
  if (!video) return

  usePlayerStore.setState({ currentTime: video.currentTime })
}

export function showControls () {
  const { setAreControlsVisible } = usePlayerStore.getState()
  setAreControlsVisible(true)
}

export function hideControls () {
  const { setAreControlsVisible } = usePlayerStore.getState()
  setAreControlsVisible(false)
}

export const debouncedHideControls = debounce(hideControls, TIME_TO_HIDE_CONTROLS)

export function showControlsAndScheduleHide () {
  showControls()
  debouncedHideControls()
}

export function toggleControlsVisibility () {
  const { areControlsVisible } = usePlayerStore.getState()
  if (areControlsVisible) {
    hideControls()
    return
  }

  showControlsAndScheduleHide()
}

export function changeQuality (quality: string | undefined) {
  const { player, setCurrentQuality } = usePlayerStore.getState()
  if (!player) return

  const representations = player.getRepresentationsByType('video')
  const representation = representations.find((rep) => rep.id === `${quality}/${quality}`)

  if (!representation) {
    throw new Error(`No se encontró la resolución ${quality}`)
  }

  setCurrentQuality(quality)
  player.setRepresentationForTypeById('video', representation.id, true)
}
