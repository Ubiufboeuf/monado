import { usePlayerStore } from '@/stores/usePlayerStore'
import { Icon } from '../../Icon'
import { IconNext, IconPause, IconPlay } from '../../Icons'
import { useVideosStore } from '@/stores/useVideosStore'
import { navigate } from 'astro:transitions/client'

export function MiddleControls () {
  const isPlaying = usePlayerStore((state) => state.isPlaying)
  const togglePlayState = usePlayerStore((state) => state.togglePlayState)
  const videosByContext = useVideosStore((state) => state.videosByContext)

  function prevVideo () {
    const id = videosByContext['suggested'].videos[0]?.id
    if (!id) return
    
    navigate(`/watch?v=${id}`)
  }

  function nextVideo () {
    const id = videosByContext['suggested'].videos[1]?.id
    if (!id) return
    
    navigate(`/watch?v=${id}`)
  }

  return (
    <section class='absolute left-1/2 top-1/2 -translate-1/2 w-full h-fit flex items-center justify-center gap-6'>
      {/* Backwards */}
      <button
        class='group flex items-center justify-center size-10 rounded-full overflow-hidden transition-colors bg-black/30 outline-0'
        onClick={prevVideo}
      >
        <div class='flex items-center justify-center size-full rounded-full pointer-events-none scale-130 transition-colors group-active:bg-white/10'>
          <Icon class='rotate-180'>
            <IconNext />
          </Icon>
        </div>
      </button>
      
      {/* Toggle Play */}
      <button
        class='group flex items-center justify-center size-14 rounded-full overflow-hidden transition-colors bg-black/30 outline-0'
        onClick={togglePlayState}
      >
        <div class='flex items-center justify-center size-full rounded-full pointer-events-none scale-130 transition-colors group-active:bg-white/10'>
          { isPlaying
            ? <Icon class='size-8 shrink-0'>
                <IconPause />
              </Icon>
            : <Icon class='size-10 shrink-0'>
                <IconPlay />
              </Icon>
          }
        </div>
      </button>

      {/* Forwards */}
      <button
        class='group flex items-center justify-center size-10 rounded-full overflow-hidden transition-colors bg-black/30 outline-0'
        onClick={nextVideo}
      >
        <div class='flex items-center justify-center size-full rounded-full pointer-events-none scale-130 transition-colors group-active:bg-white/10'>
          <Icon>
            <IconNext />
          </Icon>
        </div>
      </button>
    </section>
  )
}
