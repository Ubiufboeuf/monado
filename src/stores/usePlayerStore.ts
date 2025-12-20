import { playerKeyboardActions } from '@/lib/keyboardActions'
import type { Video } from '@/types/videoTypes'
import { create } from 'zustand'

type PlayerStore = {
  video: Video | null
  player: HTMLVideoElement | null
  playerActions: typeof playerKeyboardActions
  isPlaying: boolean
  controlsVisible: boolean
  time: number
  setVideo: (video: Video) => void
  setPlayer: (player: HTMLVideoElement) => void
  setIsPlaying: (isPlaying: boolean) => void
  setControlsVisible: (controlsVisible: boolean) => void
  setTime: (time: number) => void
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  video: null,
  player: null,
  playerActions: playerKeyboardActions,
  isPlaying: false,
  controlsVisible: false,
  time: 0,
  setVideo: (video) => set({ video }),
  setPlayer: (player) => set({ player }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setControlsVisible: (controlsVisible) => set({ controlsVisible }),
  setTime: (time) => set({ time })
}))
