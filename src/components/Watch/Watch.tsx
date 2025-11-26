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
    <section class='absolute top-14 lg:top-17 right-0 grid gap-4 h-[calc(100%-68px)] w-full ml:menu-open:w-navbar lg:px-6 [transition:width_250ms_ease]
      lg:[grid-template-areas:"player_sugeridos""detalles_sugeridos"]
      lg:grid-cols-[max(1fr_min-content)_340px]
      lg:grid-rows-[400px_1fr]

      [grid-template-areas:"player""detalles""sugeridos"]
      grid-rows-[min(80%,480px)_1fr]
    '>
      <div class='[grid-area:player] w-full desktop:min-w-160 h-full max-h-full lg:max-h-100 lg:rounded-xl mobile:max-h-dvw mobile:lg:max-h-[calc(9*100dvw/16)] bg-black'>
        <Player class='w-full h-full max-w-full max-h-full' />
      </div>
      <div class='[grid-area:sugeridos] min-w-85'>sugeridos (derecha)</div>
      <div class='[grid-area:detalles]'>detalles (abajo izquierda)</div>
    </section>
  )
}
