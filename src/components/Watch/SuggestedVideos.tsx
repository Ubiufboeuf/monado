import { useEffect, useState } from 'preact/hooks'
import { v4 as uuidv4 } from 'uuid'
import { VideoListCard } from '../VideoListCard'
import type { Video } from '@/types/videoTypes'
import { errorHandler } from '@/lib/errors'
import { getVideos } from '@/services/videoService'

export function SuggestedVideos () {
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
    <div class='flex flex-col gap-2 w-full h-fit min-h-fit'>
      { videos.map((video) => <VideoListCard key={uuidv4()} video={video} /> ) }
    </div>
  )
}
