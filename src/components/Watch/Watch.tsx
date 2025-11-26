import { usePlayerStore } from '@/stores/usePlayerStore'
import { useEffect } from 'preact/hooks'
import { getVideo } from '@/services/videoService'
import { errorHandler } from '@/lib/errors'
import { Player } from './Player'

export function Watch ({ id }: { id: string }) {
  const setVideo = usePlayerStore((state) => state.setVideo)

  async function loadVideo () {
    let video
    try {
      video = await getVideo(id)
    } catch (err) {
      errorHandler(err, 'Error consiguiendo los datos del video')
    }

    if (!video) return

    setVideo(video)
  }
  
  useEffect(() => {
    loadVideo()
  }, [])

  return (
    <section class='absolute top-17 right-0 grid gap-4 h-[calc(100%-68px)] w-full ml:menu-open:w-navbar [transition:width_250ms_ease]
      lg:[grid-template-areas:"player_sugeridos""detalles_sugeridos"]
      lg:grid-cols-[1fr_360px]
      lg:grid-rows-[auto_1fr]

      grid-rows-[80%_1fr]
    '>
      <div class='bg-black'>
        <Player class='w-full aspect-video max-h-full' />
      </div>
      <div>sugeridos (derecha)</div>
      <div>detalles (abajo izquierda)</div>
    </section>
  )
}
