import { useEffect } from 'preact/hooks'
import { v4 as uuidv4 } from 'uuid'
import { VideoListCard } from '../VideoListCard'
import { errorHandler } from '@/lib/errors'
import { getVideos } from '@/services/videoService'
import { useVideosStore } from '@/stores/useVideosStore'

export function SuggestedVideos () {
  const videos = useVideosStore((state) => state.suggestedVideos)
  const setVideos = useVideosStore((state) => state.setSuggestedVideos)

  async function loadVideos () {
    getVideos({ limit: 96 })
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
