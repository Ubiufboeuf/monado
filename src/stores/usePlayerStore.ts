import type { playerKeyboardActions } from '@/lib/keyboardActions'
import type { Video } from '@/types/videoTypes'
import { create } from 'zustand'

type PlayerMethod = (() => void) | undefined

interface PlayerStore {
  // - Resource Identification -
  videoId: string | undefined
  setVideoId: (videoId: string) => void

  video: Video | null
  setVideo: (video: Video) => void

  // - DOM References -
  element: HTMLVideoElement | null
  setElement: (element: HTMLVideoElement) => void

  // - Playback Status -
  isPlaying: boolean
  setIsPlaying: (isPlaying: boolean) => void

  hasPlayed: boolean
  setHasPlayed: (hasPlayed: boolean) => void

  // - Playback Control -
  currentTime: number
  setCurrentTime: (time: number) => void

  volume: number
  setVolume: (volume: number) => void

  // - Appearance -
  controlsVisible: boolean
  setControlsVisible: (controlsVisible: boolean) => void

  inFullScreen: boolean
  setInFullScreen: (inFullScreen: boolean) => void
  
  // - Actions -
  playerActions: typeof playerKeyboardActions

  // - Methods Syncronization -
  pause: PlayerMethod
  setPause: (fn: PlayerMethod) => void

  play: PlayerMethod
  setPlay: (fn: PlayerMethod) => void
  
  togglePlayState: PlayerMethod
  setTogglePlayState: (fn: PlayerMethod) => void
}



// === Store Declaration ===

export const usePlayerStore = create<PlayerStore>((set) => ({
    // - Resource Identification -
  videoId: undefined,
  setVideoId: (videoId) => set({ videoId }),

  video: null,
  setVideo: (video: Video) => set({ video }),

  // - DOM References -,
  element: null,
  setElement: (element: HTMLVideoElement) => set({ element }),

  // - Playback Status -,
  isPlaying: false,
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),

  hasPlayed: false,
  setHasPlayed: (hasPlayed: boolean) => set({ hasPlayed }),

  // - Playback Control -
  currentTime: 0,
  setCurrentTime: (time: number) => set({ currentTime: time }),

  volume: 0,
  setVolume: (volume: number) => set({ volume }),

  // - Appearance -,
  controlsVisible: false,
  setControlsVisible: (controlsVisible: boolean) => set({ controlsVisible }),

  inFullScreen: false,
  setInFullScreen: (inFullScreen: boolean) => set({ inFullScreen }),
  
  // - Actions -,
  playerActions: [],

  // - Methods Syncronization -
  pause: undefined,
  setPause: (fn: PlayerMethod) => set({ pause: fn }),

  play: undefined,
  setPlay: (fn: PlayerMethod) => set({ play: fn }),
  
  togglePlayState: undefined,
  setTogglePlayState: (fn: PlayerMethod) => set({ togglePlayState: fn })
}))
