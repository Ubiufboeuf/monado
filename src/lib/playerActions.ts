import { usePlayerStore } from '@/stores/usePlayerStore'

export function toggleFullScreen () {
  const { element, setInFullScreen } = usePlayerStore.getState()
  if (!element || !document.fullscreenEnabled) return

  const isFullScreen = Boolean(document.fullscreenElement)
  const watch = document.querySelector('#watch')

  const promise = isFullScreen ? document.exitFullscreen : watch?.requestFullscreen
  const thisArg = isFullScreen ? document : watch

  promise?.call(thisArg)
    .then(() => {
      const newState = Boolean(document.fullscreenElement)
      if (newState) document.documentElement.dataset.isFullScreen = ''
      else delete document.documentElement.dataset.isFullScreen
      setInFullScreen(newState)
    })
}

export function togglePlayState () {
  const { togglePlayState } = usePlayerStore.getState()
  togglePlayState?.()
}

export function changeTime (sec: number) {
  const { element } = usePlayerStore.getState()
  if (!element) return

  const time = element.currentTime 
  element.currentTime = time + sec
}

export function toggleCinemaMode () {
  const html = document.documentElement
  const inCinemaMode = html.dataset.inCinemaMode === 'true'
  const newState = !inCinemaMode
  if (newState) html.dataset.inCinemaMode = 'true'
  else delete html.dataset.inCinemaMode

  document.cookie = `monado-in-cinema-mode=${newState}; path=/; Secure; SameSite=Strict`

  document.exitFullscreen()
    .then(() => delete html.dataset.isFullScreen)
    .catch(() => {})
}
