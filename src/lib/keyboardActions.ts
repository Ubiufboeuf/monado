import { usePlayerStore } from '@/stores/usePlayerStore'

export const validKeys = [
  'f'
]

export const playerKeyboardActions = [
  { key: 'f', action: toggleFullScreen }
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
