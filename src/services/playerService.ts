import { AUTO_PLAY } from '@/lib/constants'
import { playerSettings } from '@/lib/player/playerSettings'
import { checkPlayState, showControls } from '@/lib/playerActions'
import { usePlayerStore } from '@/stores/usePlayerStore'
import type { MediaPlayerClass } from 'dashjs'

export function destroyPlayer (player?: MediaPlayerClass) {
  player?.destroy()
  usePlayerStore.setState({
    firstPlay: true,
    isPlaying: undefined
  })
}

export function updatePlayerSettings (player: MediaPlayerClass) {
  player.updateSettings(playerSettings)
}

export function initPlayer (
  player: MediaPlayerClass,
  videoElement: HTMLVideoElement,
  source: string
) {
  updatePlayerSettings(player)

  player.initialize(videoElement, source, AUTO_PLAY, 0)
  player.on('streamInitialized', () => usePlayerStore.setState({ duration: videoElement.duration }))

  usePlayerStore.setState({
    element: videoElement,
    isPlaying: videoElement.paused === false,
    areControlsVisible: true
  })

  showControls()
  checkPlayState()
}
