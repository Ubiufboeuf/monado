import type { Video } from '@/types/videoTypes'
import { create } from 'zustand'

type PlayerStore = {
  video: Video | null
  setVideo: (video: Video) => void
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  video: null,
  setVideo: (video) => set({ video })
}))
