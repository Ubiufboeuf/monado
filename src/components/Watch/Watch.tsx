import { usePlayerStore } from '@/stores/usePlayerStore'
import { useEffect } from 'preact/hooks'
import { getVideo } from '@/services/videoService'
import { errorHandler } from '@/lib/errors'
import { playerKeyboardActions, validKeys } from '@/lib/keyboardActions'
import type { ReactNode } from 'preact/compat'
import { SuggestedVideos } from './SuggestedVideos'
import { Comments } from './Comments'
import { VideoDetails } from './VideoDetails'

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
    <section id='watch' class='absolute top-14 right-0 grid gap-4 h-fit min-h-[calc(100%-14px*4)] w-full xs:px-6 [transition:width_250ms_ease] [scrollbar-width:none] bg-base-dark
      ml:menu-open:w-navbar
      lg:[grid-template-areas:"player_sugeridos""detalles_sugeridos"] lg:grid-cols-[1fr_400px] lg:grid-rows-[auto_1fr]
      2xl:max-w-screen-2xl 2xl:left-1/2 2xl:right-[unset] 2xl:-translate-x-1/2
      [grid-template-areas:"player""detalles""sugeridos"] grid-rows-[min(100dvw,80%,1fr)_1fr_1fr]
      cinema:[grid-template-areas:"player_player""detalles_sugeridos"] cinema:grid-rows-[auto_1fr] cinema:px-0
      cinema:not-lg:[grid-template-areas:"player""detalles""sugeridos"] cinema:not-lg:grid-rows-[unset]
      full-screen:[grid-template-areas:"player_player""detalles_sugeridos"] full-screen:grid-rows-[100dvh_1fr] full-screen:w-screen full-screen:h-dvh full-screen:overflow-y-scroll full-screen:px-0
      full-screen:cinema:[grid-template-areas:"player_player""detalles_sugeridos"] full-screen:cinema:grid-rows-[100dvh_1fr]
      full-screen:cinema:not-lg:[grid-template-areas:"player""detalles""sugeridos"] full-screen:cinema:not-lg:grid-rows-[unset]
    '>
      <div class='[grid-area:player] overflow-hidden bg-black
        w-full h-fit min-h-fit max-h-full
        lg:max-h-100 xs:rounded-xl
        mobile:max-h-dvw mobile:lg:max-h-[calc(9*100dvw/16)]
        cinema:max-h-full cinema:h-full cinema:w-full cinema:rounded-none
        full-screen:rounded-none
      '>
        {children}
      </div>
      <div class='[grid-area:detalles] h-fit xs:not-lg:px-4'>
        <VideoDetails />
        <Comments />
      </div>
      <div class='[grid-area:sugeridos] w-full h-full flex items-center group xs:not-lg:px-4'>
        <SuggestedVideos />
      </div>
    </section>
  )
}
