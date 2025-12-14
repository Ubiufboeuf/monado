import { create } from 'zustand'
import type { Video } from '@/types/videoTypes'

interface VideosStore {
  suggestedVideos: Video[]
  setSuggestedVideos: (suggestedVideos: Video[]) => void
}

export const useVideosStore = create<VideosStore>((set) => ({
  suggestedVideos: [],
  setSuggestedVideos: (suggestedVideos) => set({ suggestedVideos })
}))
