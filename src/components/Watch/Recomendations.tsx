import { useRecomendations } from '@/hooks/useRecomendations'
import { VideoListCard } from '../VideoListCard'
import { useMediaCheck } from '@/hooks/useMediaCheck'
import { VideoCard } from '../VideoCard'

export function Recomendations () {
  const recomendations = useRecomendations()
  if (!recomendations) return

  const [sm] = useMediaCheck('width >= 40rem', true)
  
  return (
    <section class='h-fit w-full flex flex-col gap-4'>
      { recomendations.map((r) => sm
        ? <VideoListCard key={`video-list-card:${r.id}`} video={r} />
        : <VideoCard key={`video-card:${r.id}`} video={r} />
      ) }
    </section>
  )
}
