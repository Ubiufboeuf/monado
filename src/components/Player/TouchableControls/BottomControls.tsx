import { toggleFullScreen } from '@/lib/playerActions'
import { Icon } from '../../Icon'
import { IconFullScreen } from '../../Icons'
import { usePlayerStore } from '@/stores/usePlayerStore'

export function BottomControls () {
  const inFullScreen = usePlayerStore((state) => state.inFullScreen)
  
  return (
    <section class='absolute left-1/2 bottom-0 -translate-1/2 w-full h-fit flex items-center justify-center gap-6'>
      {/* Toggle Fullscreen */}
      <button
        class='group absolute bottom-5 right-6 flex items-center justify-center size-9 rounded-full overflow-hidden transition-colors bg-black/30 outline-0'
        onClick={toggleFullScreen}
      >
        <div class='flex items-center justify-center size-6 rounded-full pointer-events-none transition-colors group-active:bg-white/10'>
          <Icon>
            <IconFullScreen inFullScreen={inFullScreen} />
          </Icon>
        </div>
      </button>
    </section>
  )
}
