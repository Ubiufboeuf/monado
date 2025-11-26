import { usePlayerStore } from '@/stores/usePlayerStore'
import { useEffect } from 'preact/hooks'
import { getVideo } from '@/services/videoService'
import { errorHandler } from '@/lib/errors'
import { Player } from './Player'
import { playerKeyboardActions, validKeys } from '@/lib/keyboardActions'

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

  function handleKeyDown (event: KeyboardEvent) {
    const key = event.key.toLowerCase()
    if (!validKeys.includes(key)) return

    const action = playerKeyboardActions.find(({ key: k }) => k === key)?.action
    if (!action) return

    action()
  }
  
  useEffect(() => {
    loadVideo()

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <section class='absolute top-14 lg:top-17 right-0 grid gap-4 h-[calc(100%-68px)] w-full ml:menu-open:w-navbar lg:px-6 [transition:width_250ms_ease]
      2xl:w-full 2xl:max-w-screen-2xl 2xl:left-1/2 2xl:right-[unset] 2xl:-translate-x-1/2
    
      lg:[grid-template-areas:"player_sugeridos""detalles_sugeridos"]
      lg:grid-cols-[minmax(min-content,2520px)_340px]
      lg:grid-rows-[400px_1fr]

      [grid-template-areas:"player""detalles""sugeridos"]
      grid-rows-[min(100dvw,80%,480px)_1fr_1fr]
    '>
      <div class='[grid-area:player] w-full desktop:min-w-160 h-full max-h-full lg:max-h-100 lg:rounded-xl mobile:max-h-dvw mobile:lg:max-h-[calc(9*100dvw/16)] bg-black'>
        <Player class='w-full h-full max-w-full max-h-full' />
      </div>
      <div class='[grid-area:detalles] h-60'>detalles (abajo izquierda)</div>
      <div class='[grid-area:sugeridos] min-w-85 h-300'>sugeridos (derecha)</div>
    </section>
  )
}
