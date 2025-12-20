import { usePlayerStore } from '@/stores/usePlayerStore'

export function ControlsTopArea () {
  const video = usePlayerStore((state) => state.video)
  const togglePlayState = usePlayerStore((state) => state.togglePlayState)

  async function handleContextMenuTopSection (event: MouseEvent) {
    const element = event.currentTarget as HTMLElement
    element.style.pointerEvents = 'none'
  }
  
  return (
    <section
      class='flex-1 max-h-[calc(100%-68px)] w-full'
      onClick={togglePlayState}
      onContextMenu={handleContextMenuTopSection}
    >
      <h1 class='not-full-screen:hidden'>{video?.title}</h1>
    </section>
  )
}
