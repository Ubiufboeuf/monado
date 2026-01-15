import { useEffect, useState } from 'preact/hooks'
import { VideoListCard } from '../VideoListCard'
import { errorHandler } from '@/lib/errors'
import { getVideos } from '@/services/videoService'
import { useVideosStore } from '@/stores/useVideosStore'
import { VideoListCardFallback } from '../VideoListCardFallback'

export function SuggestedVideos () {
  const [isComponentReady, setIsComponentReady] = useState(false)
  const videos = useVideosStore((state) => state.suggestedVideos)
  const setVideos = useVideosStore((state) => state.setSuggestedVideos)

  async function loadVideos () {
    getVideos({ limit: 96 })
      .then((videos) => setVideos(videos))
      .catch((err) => errorHandler(err))
  }

  useEffect(() => {
    setIsComponentReady(true)
    loadVideos()
  }, [])
  
  return (
    <div class='flex flex-col gap-2 w-full h-fit min-h-fit'>
      { isComponentReady
        ? videos.map((video) => <VideoListCard key={`suggested-list-video:${video.id}`} video={video} /> )
        : <>
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
          </>
      }
    </div>
  )
}
