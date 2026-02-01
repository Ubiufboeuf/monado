import { useEffect, useState } from 'preact/hooks'
import { errorHandler } from '@/lib/errors'
import { getVideos } from '@/services/videoService'
import { useVideosStore } from '@/stores/useVideosStore'
import { VideoListCardFallback } from '../VideoListCardFallback'
import { VIDEOS_LIMIT_PER_REQUEST } from '@/lib/constants'
import { SuggestedVideosList } from './SuggestedVideos/SuggestedVideosList'
import { SuggestedVideosError } from './SuggestedVideos/SuggestedVideosError'
import type { FC } from 'preact/compat'
import { usePlayerStore } from '@/stores/usePlayerStore'

export function SuggestedVideos () {
  const [isComponentReady, setIsComponentReady] = useState(false)
  const [MainContent, setMainContent] = useState<FC>()
  const { videos } = useVideosStore((state) => state.videosByContext.suggested)
  const addVideos = useVideosStore((state) => state.addVideos)
  const setCursor = useVideosStore((state) => state.setCursor)
  const clearVideos = useVideosStore((state) => state.clearVideos)
  const clearCursor = useVideosStore((state) => state.clearCursor)
  const videoId = usePlayerStore((state) => state.videoId)

  async function loadVideos () {
    getVideos({ limit: VIDEOS_LIMIT_PER_REQUEST })
      .then(({ videos, cursor }) => {
        addVideos('suggested', videos)
        setCursor('suggested', cursor)
      })
      .catch((err) => errorHandler(err))
      .finally(() => setIsComponentReady(true))
  }

  useEffect(() => {
    loadVideos()

    return () => {
      clearVideos('suggested')
      clearCursor('suggested')
      setIsComponentReady(false)
    }
  }, [videoId])

  useEffect(() => {
    if (videos.length) setMainContent(() => SuggestedVideosList) // videos
    else if (!videos.length && isComponentReady) setMainContent(() => SuggestedVideosError) // error
  }, [isComponentReady])
  
  // Contenido
  if (MainContent && isComponentReady) return <MainContent />

  // Fallback
  return (
    <div class='flex flex-col gap-2 w-full h-fit min-h-fit'>
      <VideoListCardFallback />
      <VideoListCardFallback />
      <VideoListCardFallback />
      <VideoListCardFallback />
      <VideoListCardFallback />
      <VideoListCardFallback />
      <VideoListCardFallback />
      <VideoListCardFallback />
      <VideoListCardFallback />
      <VideoListCardFallback />
      <VideoListCardFallback />
      <VideoListCardFallback />
    </div>
  )
}
