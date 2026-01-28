import { VideoCard } from '../VideoCard'
import { useRef } from 'preact/hooks'
import { useVideosStore } from '@/stores/useVideosStore'
import { getVideos } from '@/services/videoService'
import { VIDEOS_LIMIT_PER_REQUEST } from '@/lib/constants'
import { errorHandler } from '@/lib/errors'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const options: IntersectionObserverInit = {
  rootMargin: '0px 0px 0px 0px',
  threshold: 0
}

export function HomeVideos () {
  const { videos } = useVideosStore((state) => state.videosByContext.home)
  const addVideos = useVideosStore((state) => state.addVideos)
  const { cursor } = useVideosStore((state) => state.videosByContext.home)
  const setCursor = useVideosStore((state) => state.setCursor)
  const videosSentinelRef = useRef<HTMLDivElement>(null)
  const loadingRef = useRef(false)

  useIntersectionObserver(videosSentinelRef, loadMoreVideos, options)

  async function loadMoreVideos () {
    if (!cursor || loadingRef.current) return

    loadingRef.current = true
    
    getVideos({ limit: VIDEOS_LIMIT_PER_REQUEST, cursor })
      .then(({ videos, cursor }) => {
        addVideos('home', videos)
        setCursor('home', cursor)
      })
      .catch((err) => errorHandler(err))
      .finally(() => {
        loadingRef.current = false
      })
  }
  
  return (
    <div class='grid justify-center items-start gap-4 grid-cols-[repeat(auto-fill,minmax(312px,1fr))] h-fit w-full max-h-fit max-w-full overflow-hidden pb-6 sm:px-6 sm:pt-3 not-desktop:pb-tbh [content-visibility:auto]'>
      { videos.map((video) => <VideoCard key={`home-video-card:${video.id}`} video={video} />) }
      <div ref={videosSentinelRef} class='absolute -z-100 -bottom-[20dvh] h-dvh w-full pointer-events-none' />
      <div
        class='col-span-full h-16 not-xs:pb-4 w-full flex justify-center items-center gap-4 text-neutral-200'
        hidden={!cursor}
      >
        <div class='size-8 rounded-full border-4 border-current border-t-transparent animate-spin' />
        <span>Cargando más videos...</span>
      </div>
    </div>
  )
}
