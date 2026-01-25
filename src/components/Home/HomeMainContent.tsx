import { errorHandler } from '@/lib/errors'
import { getVideos } from '@/services/videoService'
import { useEffect, useState } from 'preact/hooks'
import type { Video } from '@/types/videoTypes'
import type { FC } from 'preact/compat'
import { HomeVideos } from './HomeVideos'
import { HomeGuest } from './HomeGuest'
import { HomeError } from './HomeError'
import { VideoCardFallback } from '../VideoCardFallback'
import { VIDEOS_LIMIT_PER_REQUEST } from '@/lib/constants'
import { useVideosStore } from '@/stores/useVideosStore'

export function HomeMainContent () {
  const [isComponentReady, setIsComponentReady] = useState(false)
  const [MainContent, setMainContent] = useState<FC<{ videos: Video[] }>>()
  const videos = useVideosStore((state) => state.homeVideos)
  const addVideos = useVideosStore((state) => state.addHomeVideos)
  const setCursor = useVideosStore((state) => state.setHomeCursor)
  const user = { hasSearched: true }

  async function loadVideos () {
    getVideos({ limit: VIDEOS_LIMIT_PER_REQUEST })
      .then(({ videos, cursor }) => {
        addVideos(videos)
        setCursor(cursor)
      })
      .catch((err) => errorHandler(err))
      .finally(() => setIsComponentReady(true))
  }
  
  useEffect(() => {
    if (!user.hasSearched) {
      setIsComponentReady(true)
      return
    }

    loadVideos()
  }, [])

  useEffect(() => {
    if (!user.hasSearched) setMainContent(() => HomeGuest) // invitado
    else if (videos.length) setMainContent(() => HomeVideos) // videos
    else if (!videos.length && isComponentReady) setMainContent(() => HomeError) // no videos (error)
  }, [videos, isComponentReady])

  // Contenido
  if (MainContent && isComponentReady) return <MainContent videos={videos} />

  // Fallback
  return (
    <div class='grid justify-center items-start gap-4 grid-cols-[repeat(auto-fill,minmax(312px,1fr))] h-fit w-full max-h-fit max-w-full overflow-x-hidden pb-6 sm:px-6 sm:pt-3 not-desktop:pb-tbh'>
      <VideoCardFallback />
      <VideoCardFallback />
      <VideoCardFallback />
      <VideoCardFallback />
      <VideoCardFallback />
      <VideoCardFallback />
      <VideoCardFallback />
      <VideoCardFallback />
      <VideoCardFallback />
      <VideoCardFallback />
      <VideoCardFallback />
      <VideoCardFallback />
    </div>
  )
}
