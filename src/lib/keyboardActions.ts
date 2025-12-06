import { usePlayerStore } from '@/stores/usePlayerStore'


export const validKeys = [
  'f',
  ' '
] as const

type KeyboardAction = {
  key: typeof validKeys[number],
  action: (event: KeyboardEvent) => void
  preventDefault?: boolean
}

export const playerKeyboardActions: KeyboardAction[] = [
  { key: 'f', action: toggleFullScreen },
  { key: ' ', action: togglePlayerState, preventDefault: true }
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
