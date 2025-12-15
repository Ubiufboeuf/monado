import { errorHandler } from '@/lib/errors'
import { getVideos } from '@/services/videoService'
import { useEffect, useState } from 'preact/hooks'
import type { Video } from '@/types/videoTypes'
import type { FC } from 'preact/compat'
import { HomeVideos } from './HomeVideos'
import { HomeGuest } from './HomeGuest'
import { HomeError } from './HomeError'
import { VideoCardFallback } from '../VideoCardFallback'

export function HomeMainContent () {
  const [isComponentReady, setIsComponentReady] = useState(false)
  const [MainContent, setMainContent] = useState<FC<{ videos: Video[] }>>()
  const [videos, setVideos] = useState<Video[]>([])
  const user = { hasSearched: true }

  async function loadVideos () {
    getVideos({ limit: 96 })
      .then((videos) => setVideos(videos))
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
    <div class='grid justify-center items-start ms:gap-4 grid-cols-[min(100%,500px)] ms:grid-cols-[repeat(auto-fill,minmax(312px,1fr))] h-fit w-full max-h-fit max-w-full pt-6 sm:p-6'>
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
