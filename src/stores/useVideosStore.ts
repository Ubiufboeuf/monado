import { create } from 'zustand'
import type { Video } from '@/types/videoTypes'

export type VideosContext = 'home' | 'suggested'

interface VideosState {
  videos: Video[]
  cursor?: string
}

interface VideosStore {
  videosByContext: Record<VideosContext, VideosState>

  setVideos: (ctx: VideosContext, videos: Video[]) => void
  addVideos: (ctx: VideosContext, newVideos: Video[]) => void
  setCursor: (ctx: VideosContext, cursor: string | undefined) => void
}

export const useVideosStore = create<VideosStore>((set) => ({
  videosByContext: {
    home: { videos: [], cursor: undefined },
    suggested: { videos: [], cursor: undefined }
  },

  setVideos (ctx, videos) {
    set(({ videosByContext }) => ({
      videosByContext: {
        ...videosByContext,
        [ctx]: {
          ...videosByContext[ctx],
          videos
        }
      }
    }))
  },

  addVideos (ctx, newVideos) {
    set(({ videosByContext }) => ({
      videosByContext: {
        ...videosByContext,
        [ctx]: {
          ...videosByContext[ctx],
          videos: [
            ...videosByContext[ctx].videos,
            ...newVideos
          ]
        }
      }
    }))
  },

  setCursor (ctx, cursor) {
    set(({ videosByContext }) => ({
      videosByContext: {
        ...videosByContext,
        [ctx]: {
          ...videosByContext[ctx],
          cursor
        }
      }
    }))
  }
}))
