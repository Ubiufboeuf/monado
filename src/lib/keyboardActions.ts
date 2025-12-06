import { usePlayerStore } from '@/stores/usePlayerStore'


export const validKeys = [
  'f',
  ' ',
  'k',
  'j',
  'l',
  'arrowleft',
  'arrowright'
] as const

type KeyboardAction = {
  key: typeof validKeys[number],
  action: (event: KeyboardEvent) => void
  preventDefault?: boolean
}

export const playerKeyboardActions: KeyboardAction[] = [
  { key: 'f', action: toggleFullScreen },
  { key: ' ', action: togglePlayerState, preventDefault: true },
  { key: 'k', action: togglePlayerState, preventDefault: true },
  { key: 'j', action: () => changeTime(-10) },
  { key: 'l', action: () => changeTime(10) },
  { key: 'arrowleft', action: () => changeTime(-5) },
  { key: 'arrowright', action: () => changeTime(5) }
]

function toggleFullScreen () {
  const player = usePlayerStore.getState().player
  if (!player || !document.fullscreenEnabled) return

  const isFullScreen = Boolean(document.fullscreenElement)

  const promise = isFullScreen ? document.exitFullscreen : player.parentElement?.requestFullscreen
  const thisArg = isFullScreen ? document : player.parentElement

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
  const { player } = usePlayerStore.getState()
  if (!player) return

  const time = player.currentTime 
  player.currentTime = time + sec
}
