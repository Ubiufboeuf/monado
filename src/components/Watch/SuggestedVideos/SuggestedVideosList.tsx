import { useVideos } from '@/hooks/useVideos'
import { SuggestedVideo } from './SuggestedVideo'
import { useMediaCheck } from '@/hooks/useMediaCheck'

const options: IntersectionObserverInit = {
  rootMargin: '0px 0px 0px 0px',
  threshold: 0
}

export function SuggestedVideosList () {
  const {
    videos,
    videosSentinelRef,
    cursor
  } = useVideos({ context: 'suggested', options })

  const [isMobile] = useMediaCheck('(width < 412px)')
  
  return (
    <div class='flex flex-col gap-4 sm:gap-2 w-full h-fit min-h-fit pb-22 desktop:pb-6 desktop:lg:pb-2 [content-visibility:auto]'>
      { videos.map((video) => (
        <SuggestedVideo
          key={`suggested-video:${video.id}`}
          video={video}
          isMobile={isMobile}
        />
      ) ) }
      <div ref={videosSentinelRef} class='absolute -z-100 left-0 -bottom-[20dvh] h-dvh w-full pointer-events-none' />
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
