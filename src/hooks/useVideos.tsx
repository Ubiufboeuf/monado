import { useVideosStore, type VideosContext } from '@/stores/useVideosStore'
import { useRef } from 'preact/hooks'
import { useIntersectionObserver } from './useIntersectionObserver'
import { getVideos } from '@/services/videoService'
import { VIDEOS_LIMIT_PER_REQUEST } from '@/lib/constants'
import { errorHandler } from '@/lib/errors'

interface HookProps {
  context: VideosContext,
  options: IntersectionObserverInit
  videosPerRequest?: number
}

export function useVideos ({ context, options, videosPerRequest = VIDEOS_LIMIT_PER_REQUEST }: HookProps) {
  const { videos } = useVideosStore((state) => state.videosByContext[context])
  const addVideos = useVideosStore((state) => state.addVideos)
  const { cursor } = useVideosStore((state) => state.videosByContext[context])
  const setCursor = useVideosStore((state) => state.setCursor)
  const videosSentinelRef = useRef<HTMLDivElement>(null)

  useIntersectionObserver(videosSentinelRef, loadMoreVideos, options)

  async function loadMoreVideos () {
    if (!cursor) return

    getVideos({ limit: videosPerRequest, cursor })
      .then(({ videos, cursor }) => {
        addVideos(context, videos)
        setCursor(context, cursor)
      })
      .catch((err) => errorHandler(err))
  }

  return {
    videos,
    videosSentinelRef,
    cursor
  }
}
