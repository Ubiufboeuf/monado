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

  const isFullScreen = document.fullscreenElement
  document.documentElement.dataset.fullScreen = `${Boolean(isFullScreen)}`

  if (isFullScreen) document.exitFullscreen()
  else player.requestFullscreen()
}
