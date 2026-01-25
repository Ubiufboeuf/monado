import { create } from 'zustand'
import type { Video } from '@/types/videoTypes'

interface VideosStore {
  homeVideos: Video[]
  setHomeVideos: (videos: Video[]) => void
  addHomeVideos: (newVideos: Video[]) => void
  homeCursor: string | undefined
  setHomeCursor: (newCursor: string | undefined) => void
  suggestedVideos: Video[]
  setSuggestedVideos: (suggestedVideos: Video[]) => void
}

export const useVideosStore = create<VideosStore>((set) => ({
  homeVideos: [],
  homeCursor: undefined,
  setHomeVideos: (homeVideos) => set({ homeVideos }),
  addHomeVideos (newVideos: Video[]) {
    set((state) => {
      const map = new Map(state.homeVideos.map((v) => [v.id, v]))

      let changed = false

      for (const video of newVideos) {
        if (!map.has(video.id)) {
          map.set(video.id, video)
          changed = true
        }
      }

      if (!changed) return state

      return {
        homeVideos: Array.from(map.values())
      }
    })
  },
  setHomeCursor: (homeCursor) => set({ homeCursor }),
  suggestedVideos: [],
  setSuggestedVideos: (suggestedVideos) => set({ suggestedVideos })
}))
