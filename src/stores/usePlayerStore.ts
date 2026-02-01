import { playerKeyboardActions } from '@/lib/keyboardActions'
import type { Video } from '@/types/videoTypes'
import { create } from 'zustand'

type PlayerStore = {
  videoId: string | undefined
  video: Video | null
  element: HTMLVideoElement | null
  playerActions: typeof playerKeyboardActions
  isPlaying: boolean
  controlsVisible: boolean
  currentTime: number
  volume: number
  hasPlayed: boolean
  setVideoId: (id: string | undefined) => void
  setHasPlayed: (hasPlayed: boolean) => void
  pause: undefined | (() => void)
  play: undefined | (() => void)
  togglePlayState: undefined | (() => void)
  setVideo: (video: Video) => void
  setElement: (element: HTMLVideoElement) => void
  setIsPlaying: (isPlaying: boolean) => void
  setControlsVisible: (controlsVisible: boolean) => void
  setCurrentTime: (time: number) => void
  setVolume: (volume: number) => void
  setPause: (fn: undefined | (() => void)) => void
  setPlay: (fn: undefined | (() => void)) => void
  setTogglePlayState: (fn: undefined | (() => void)) => void
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  videoId: undefined,
  video: null,
  element: null,
  playerActions: playerKeyboardActions,
  isPlaying: false,
  controlsVisible: false,
  currentTime: 0,
  volume: 0,
  pause: undefined,
  play: undefined,
  togglePlayState: undefined,
  hasPlayed: false,
  setVideoId: (videoId) => set({ videoId }),
  setHasPlayed: (hasPlayed) => set({ hasPlayed }),
  setVideo: (video) => set({ video }),
  setElement: (element) => set({ element }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setControlsVisible: (controlsVisible) => set({ controlsVisible }),
  setCurrentTime: (currentTime) => set({ currentTime }),
  setVolume: (volume) => set({ volume }),
  setPause: (pause) => set({ pause }),
  setPlay: (play) => set({ play }),
  setTogglePlayState: (togglePlayState) => set({ togglePlayState })
}))
