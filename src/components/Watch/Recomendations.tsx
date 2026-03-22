import { useRecomendations } from '@/hooks/useRecomendations'
import { VideoListCard } from '../VideoListCard'
import { useMediaCheck } from '@/hooks/useMediaCheck'
import { VideoCard } from '../VideoCard'

export function Recomendations () {
  const recomendations = useRecomendations()
  if (!recomendations) return

  const [sm] = useMediaCheck('(width >= 1024px)')
  
  return (
    <section class='h-fit w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-2 xs:not-lg:cinema:px-4'>
      { recomendations.map((r) => sm
        ? <VideoListCard key={`video-list-card:${r.id}`} video={r} />
        : <VideoCard key={`video-card:${r.id}`} video={r} />
      ) }
    </section>
  )
}
