import { usePlayerStore } from '@/stores/usePlayerStore'
import { Icon } from '../Icon'
import { IconResolution } from '../Icons'

export function BottomRightControls () {
  const isPanelVisible = usePlayerStore((state) => state.isPanelVisible)
  const setIsPanelVisible = usePlayerStore((state) => state.setIsPanelVisible)
  const panelContent = usePlayerStore((state) => state.panelContent)
  const setPanelContent = usePlayerStore((state) => state.setPanelContent)

  function toggleResolutionsSelector () {
    setIsPanelVisible(!isPanelVisible)
    if (panelContent !== 'resolutions') setPanelContent('resolutions')
  }

  return (
    <section class='flex items-center gap-2'>
      {/* Captions */}

      {/* Resolution */}
      <button
        class='group flex items-center justify-center size-10 rounded-full overflow-hidden cursor-pointer transition-colors bg-black/30 outline-0 border-2 border-transparent focus-within:border-focus'
        onClick={toggleResolutionsSelector}
      >
        <div class='flex items-center justify-center size-full rounded-full p-1 pointer-events-none transition-colors group-hover:bg-white/10'>
          <Icon class='size-8'>
            <IconResolution resolution='hd' />
          </Icon>
        </div>
      </button>

      {/* Settings */}
      {/* Chat */}
      {/* Toggle Mini Player */}
      {/* Toggle Cinema Mode */}
      {/* Toggle Fullscreen */}
    </section>
  )
}
