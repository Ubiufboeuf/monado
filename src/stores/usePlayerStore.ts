import type { Video } from '@/types/videoTypes'
import { create } from 'zustand'

interface PlayerStore {
  video: Video | undefined
  setVideo: (video: Video | undefined) => void
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  video: undefined,
  setVideo: (video) => set({ video })
}))
