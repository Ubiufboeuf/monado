import type { Video } from '@/types/videoTypes'
import type { MediaPlayerClass } from 'dashjs'
import { create } from 'zustand'

interface PlayerStore {
  element: HTMLVideoElement | undefined
  setElement: (element: HTMLVideoElement | undefined) => void
  
  video: Video | undefined
  setVideo: (video: Video | undefined) => void

  player: MediaPlayerClass | undefined
  setPlayer: (player: MediaPlayerClass | undefined) => void

  isPlaying: boolean
  setIsPlaying: (isPlaying: boolean) => void

  firstPlay: boolean
  setFirstPlay: (firstPlay: boolean) => void

  currentTime: number | undefined
  setCurrentTime: (time: number | undefined) => void

  duration: number | undefined
  setDuration: (duration: number | undefined) => void

  inCinemaMode: boolean
  setInCinemaMode: (inCinemaMode: boolean) => void

  areControlsVisible: boolean
  setAreControlsVisible: (areControlsVisible: boolean) => void

  currentMenu: string | undefined
  setCurrentMenu: (currentMenu: string | undefined) => void
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  element: undefined,
  setElement: (element) => set({ element }),
  
  video: undefined,
  setVideo: (video) => set({ video }),

  player: undefined,
  setPlayer: (player) => set({ player }),

  isPlaying: false,
  setIsPlaying: (isPlaying) => set({ isPlaying }),

  firstPlay: true,
  setFirstPlay: (firstPlay) => set({ firstPlay }),

  currentTime: undefined,
  setCurrentTime: (currentTime) => set({ currentTime }),

  duration: undefined,
  setDuration: (duration) => set({ duration }),

  inCinemaMode: false,
  setInCinemaMode: (inCinemaMode) => set({ inCinemaMode }),

  areControlsVisible: false,
  setAreControlsVisible: (areControlsVisible) => set({ areControlsVisible }),

  currentMenu: undefined,
  setCurrentMenu: (currentMenu) => set({ currentMenu }),
}))
