import { useEffect, useState } from 'preact/hooks'
import { VideoListCard } from '../VideoListCard'
import { errorHandler } from '@/lib/errors'
import { getVideos } from '@/services/videoService'
import { useVideosStore } from '@/stores/useVideosStore'
import { VideoListCardFallback } from '../VideoListCardFallback'
import { VideoCard } from '../VideoCard'

export function SuggestedVideos () {
  const [isComponentReady, setIsComponentReady] = useState(false)
  const { videos } = useVideosStore((state) => state.videosByContext.suggested)
  const addVideos = useVideosStore((state) => state.addVideos)
  const setCursor = useVideosStore((state) => state.setCursor)

  async function loadVideos () {
    getVideos({ limit: 96 })
      .then(({ videos, cursor }) => {
        addVideos('suggested', videos)
        setCursor('suggested', cursor)
      })
      .catch((err) => errorHandler(err))
  }

  useEffect(() => {
    setIsComponentReady(true)
    loadVideos()
  }, [])
  
  return (
    <div class='flex flex-col gap-2 w-full h-fit min-h-fit'>
      { isComponentReady
        ? videos.map((video) => <>
            <VideoListCard key={`suggested-list-video:${video.id}`} video={video} class='not-xs:hidden' />
            <VideoCard key={`suggested-list-video-small:${video.id}`} video={video} class='xs:hidden' />
          </> )
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
