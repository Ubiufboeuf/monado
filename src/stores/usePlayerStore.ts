import { playerKeyboardActions } from '@/lib/keyboardActions'
import type { Video } from '@/types/videoTypes'
import { create } from 'zustand'

type PlayerStore = {
  video: Video | null
  player: HTMLVideoElement | null
  playerActions: typeof playerKeyboardActions
  isPlaying: boolean
  controlsVisible: boolean
  setVideo: (video: Video) => void
  setPlayer: (player: HTMLVideoElement) => void
  setIsPlaying: (isPlaying: boolean) => void
  setControlsVisible: (controlsVisible: boolean) => void
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  video: null,
  player: null,
  playerActions: playerKeyboardActions,
  isPlaying: false,
  controlsVisible: false,
  setVideo: (video) => set({ video }),
  setPlayer: (player) => set({ player }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setControlsVisible: (controlsVisible) => set({ controlsVisible })
}))
