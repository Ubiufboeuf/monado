import { usePlayerStore } from '@/stores/usePlayerStore'

export function toggleCinemaMode () {
  const { playerLayout, setPlayerLayout } = usePlayerStore.getState()
  const newState = playerLayout === 'cinema' ? 'tv' : 'cinema'
  setPlayerLayout(newState)
  document.documentElement.setAttribute('data-player-layout', newState)
}

export async function togglePlayState () {
  const { element } = usePlayerStore.getState()
  if (!element) return
  
  const isPaused = element.paused
  
  if (isPaused) {
    await element.play()
  } else {
    element.pause()
  }
}

export async function toggleFullScreen () {
  const { element } = usePlayerStore.getState()
  
  const inFullScreen = Boolean(document.fullscreenElement)
  try {
    if (inFullScreen) await document.exitFullscreen()
    else element?.requestFullscreen()
  } catch {/* empty */}
}
