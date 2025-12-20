import { playerKeyboardActions } from '@/lib/keyboardActions'
import type { Video } from '@/types/videoTypes'
import { create } from 'zustand'

type PlayerStore = {
  video: Video | null
  element: HTMLVideoElement | null
  playerActions: typeof playerKeyboardActions
  isPlaying: boolean
  controlsVisible: boolean
  time: number
  togglePlayState: undefined | (() => void)
  setVideo: (video: Video) => void
  setElement: (element: HTMLVideoElement) => void
  setIsPlaying: (isPlaying: boolean) => void
  setControlsVisible: (controlsVisible: boolean) => void
  setTime: (time: number) => void
  setTogglePlayState: (fn: () => void) => void
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  video: null,
  element: null,
  playerActions: playerKeyboardActions,
  isPlaying: false,
  controlsVisible: false,
  time: 0,
  togglePlayState: undefined,
  setVideo: (video) => set({ video }),
  setElement: (element) => set({ element }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setControlsVisible: (controlsVisible) => set({ controlsVisible }),
  setTime: (time) => set({ time }),
  setTogglePlayState: (togglePlayState) => set({ togglePlayState })
}))
