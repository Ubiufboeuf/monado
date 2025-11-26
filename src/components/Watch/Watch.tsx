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
    <section class='absolute top-17 right-0 flex flex-col h-[calc(100%-56px)] min-h-fit w-full sm:w-[calc(100%-72px)] ml:menu-open:w-navbar [transition:width_250ms_ease]'>
      <Player />
    </section>
  )
}
