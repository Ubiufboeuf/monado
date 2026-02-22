import { usePlayerStore } from '@/stores/usePlayerStore'
import { ResolutionsPanel } from './Resolutions'

export function PlayerSettingsPanel () {
  const panelContent = usePlayerStore((state) => state.panelContent)
  const isPanelVisible = usePlayerStore((state) => state.isPanelVisible)
  const setIsPanelVisible = usePlayerStore((state) => state.setIsPanelVisible)
  
  function closePanel () {
    setIsPanelVisible(false)
  }
  
  return (
    <section
      class='absolute bottom-20 right-4 h-fit max-h-full w-fit overflow-hidden rounded-lg bg-base-dark'
      hidden={!isPanelVisible}
    >
      { panelContent === 'resolutions' && <ResolutionsPanel closePanel={closePanel} /> }
    </section>
  )
}
