import { useRecomendations } from '@/hooks/useRecomendations'
import { VideoCard } from '../videos/VideoCard'

export function Recomendations ({ id }: { id: string }) {
  const recomendations = useRecomendations(id)
  if (!recomendations) {
    return (
      <section class='h-full w-full flex flex-col items-center justify-center'>
        <h1 class='text-center text-neutral-300 font-semibold text-lg'>Hubo un error consiguiendo las recomendaciones</h1>
        <span class='text-center text-neutral-400'>Prueba a recargar la página</span>
      </section>
    )
  }

  return (
    <section class='flex flex-col gap-2'>
      { recomendations.map((recomendation) => (
        <VideoCard
          key={`video-card-${recomendation.id}`}
          to={`/watch?v=${recomendation.id}`}
          video={recomendation}
        />
      )) }
    </section>
  )
}
