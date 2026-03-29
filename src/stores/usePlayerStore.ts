import type { Video } from '@/types/videoTypes'
import { create } from 'zustand'

interface PlayerStore {
  element: HTMLVideoElement | undefined
  setElement: (element: HTMLVideoElement | undefined) => void
  
  video: Video | undefined
  setVideo: (video: Video | undefined) => void

  isPlaying: boolean
  setIsPlaying: (isPlaying: boolean) => void

  inCinemaMode: boolean
  setInCinemaMode: (inCinemaMode: boolean) => void
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  element: undefined,
  setElement: (element) => set({ element }),
  
  video: undefined,
  setVideo: (video) => set({ video }),

  isPlaying: false,
  setIsPlaying: (isPlaying) => set({ isPlaying }),

  inCinemaMode: false,
  setInCinemaMode: (inCinemaMode) => set({ inCinemaMode })
}))
