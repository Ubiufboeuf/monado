import { usePlayerStore } from '@/stores/usePlayerStore'
import { useEffect } from 'preact/hooks'
import { getVideo } from '@/services/videoService'
import { errorHandler } from '@/lib/errors'
import { playerKeyboardActions, validKeys } from '@/lib/keyboardActions'
import type { ReactNode } from 'preact/compat'
import { SuggestedVideos } from './SuggestedVideos'

export function Watch ({ id, children }: { id: string, children: ReactNode }) {
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
    const target = event.target as HTMLElement
    if (!target) return

    const key = event.key.toLowerCase()
    if (!validKeys.includes(key as typeof validKeys[number]) || target.closest('section')?.id === 'search-bar') return

    const keyboardAction = playerKeyboardActions.find(({ key: k }) => k === key)
    if (!keyboardAction) return

    const { action, preventDefault } = keyboardAction

    if (preventDefault) event.preventDefault()

    action(event)
  }
  
  useEffect(() => {
    loadVideo()

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <section id='watch' class='absolute top-14 right-0 grid gap-4 h-fit w-full px-6 [transition:width_250ms_ease] [scrollbar-width:none] bg-base-dark
      ml:menu-open:w-navbar
      lg:top-17 lg:[grid-template-areas:"player_sugeridos""detalles_sugeridos"] lg:grid-cols-[1fr_400px] lg:grid-rows-[auto_1fr]
      2xl:max-w-screen-2xl 2xl:left-1/2 2xl:right-[unset] 2xl:-translate-x-1/2
      [grid-template-areas:"player""detalles""sugeridos"] grid-rows-[min(100dvw,80%,1fr)_1fr_1fr]
      cinema:[grid-template-areas:"player_player""detalles_sugeridos"] cinema:grid-rows-[74dvh_1fr] cinema:px-0
      full-screen:[grid-template-areas:"player_player""detalles_sugeridos"] full-screen:grid-rows-[100dvh_1fr] full-screen:w-screen full-screen:h-dvh full-screen:overflow-y-scroll full-screen:px-0
      full-screen:cinema:[grid-template-areas:"player_player""detalles_sugeridos"] full-screen:cinema:grid-rows-[100dvh_1fr]
    '>
      <div class='[grid-area:player] overflow-hidden bg-black
        w-full h-fit min-h-fit max-h-full
        lg:max-h-100 lg:rounded-xl
        mobile:max-h-dvw mobile:lg:max-h-[calc(9*100dvw/16)]
        desktop:min-w-160
        cinema:max-h-full cinema:h-full cinema:w-full cinema:rounded-none
        full-screen:rounded-none
      '>
        {children}
      </div>
      <div class='[grid-area:detalles] h-60'>detalles (abajo izquierda)</div>
      <div class='[grid-area:sugeridos] min-w-85 w-full h-fit'>
        <SuggestedVideos />
      </div>
    </section>
  )
}
