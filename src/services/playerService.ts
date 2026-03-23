import { playerSettings } from '@/lib/player/playerSettings'
import type { MediaPlayerClass } from 'dashjs'

export function destroyPlayer (player?: MediaPlayerClass) {
  player?.destroy()
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

  player.initialize(videoElement, source, true, 0)
}
