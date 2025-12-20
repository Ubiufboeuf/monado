import { usePlayerStore } from '@/stores/usePlayerStore'
import { throttle } from './utils'

const REPEAT_LIMIT = 60

export const validKeys = [
  'f',
  ' ',
  'k',
  'j',
  'l',
  'arrowleft',
  'arrowright',
  't'
] as const

type KeyboardAction = {
  key: typeof validKeys[number],
  action: (event: KeyboardEvent) => void
  preventDefault?: boolean
}

export const playerKeyboardActions: KeyboardAction[] = [
  { key: 'f', action: throttle(toggleFullScreen, REPEAT_LIMIT) },
  { key: ' ', action: throttle(togglePlayerState, REPEAT_LIMIT), preventDefault: true },
  { key: 'k', action: throttle(togglePlayerState, REPEAT_LIMIT), preventDefault: true },
  { key: 'j', action: throttle(() => changeTime(-10), REPEAT_LIMIT) },
  { key: 'l', action: throttle(() => changeTime(10), REPEAT_LIMIT) },
  { key: 'arrowleft', action: throttle(() => changeTime(-5), REPEAT_LIMIT) },
  { key: 'arrowright', action: throttle(() => changeTime(5), REPEAT_LIMIT) },
  { key: 't', action: toggleCinemaMode }
]

function toggleFullScreen () {
  const { element } = usePlayerStore.getState()
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
    })
}

function togglePlayerState () {
  const { setIsPlaying, isPlaying } = usePlayerStore.getState()
  setIsPlaying(!isPlaying)
}

function changeTime (sec: number) {
  const { element } = usePlayerStore.getState()
  if (!element) return

  const time = element.currentTime 
  element.currentTime = time + sec
}

function toggleCinemaMode () {
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
