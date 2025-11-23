import { errorHandler } from '@/lib/errors'
import { getVideos } from '@/services/videoService'
import { useEffect, useState } from 'preact/hooks'
import { VideoCard } from '../VideoCard'
import { v4 as uuidv4 } from 'uuid'
import type { Video } from '@/types/videoTypes'

export function HomeMainContent () {
  const [videos, setVideos] = useState<Video[]>([])

  async function loadVideos () {
    getVideos()
      .then((videos) => setVideos(videos))
      .catch((err) => errorHandler(err))
  }
  
  useEffect(() => {
    loadVideos()
  }, [])

  return (
    <div class='grid justify-center items-start ms:gap-4 grid-cols-[min(100%,500px)] ms:grid-cols-[repeat(auto-fill,minmax(312px,1fr))] h-fit w-full max-h-fit max-w-full pt-6 sm:p-6'>
      { videos.map((video) => <VideoCard key={uuidv4()} video={video} />) }
    </div>
  )
}
