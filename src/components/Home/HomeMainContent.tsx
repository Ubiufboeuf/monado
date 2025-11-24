import { errorHandler } from '@/lib/errors'
import { getVideos } from '@/services/videoService'
import { useEffect, useState } from 'preact/hooks'
import type { Video } from '@/types/videoTypes'
import type { FC } from 'preact/compat'
import { HomeVideos } from './HomeVideos'
import { HomeGuest } from './HomeGuest'
import { HomeError } from './HomeError'

export function HomeMainContent () {
  const [isComponentReady, setIsComponentReady] = useState(false)
  const [MainContent, setMainContent] = useState<FC<{ videos: Video[] }>>()
  const [videos, setVideos] = useState<Video[]>([])
  const user = { hasSearched: true }

  async function loadVideos () {
    getVideos()
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

  return (MainContent && isComponentReady) && <MainContent videos={videos} />
}
