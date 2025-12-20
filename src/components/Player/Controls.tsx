import { usePlayerStore } from '@/stores/usePlayerStore'

interface ControlsProps {
  togglePlayState: () => void
}

export function Controls ({ togglePlayState }: ControlsProps) {
  const controlsVisible = usePlayerStore((state) => state.controlsVisible)
  // const isPlaying = usePlayerStore((state) => state.isPlaying)

  function handleContextMenu (event: MouseEvent) {
    const controls = event.currentTarget as HTMLElement

    controls.style.pointerEvents = 'none'

    const restore = () => {
      controls.style.pointerEvents = 'auto'
      document.removeEventListener('keydown', restore)
      document.removeEventListener('mousemove', restore)
      document.removeEventListener('click', restore)
    }

    document.addEventListener('keydown', restore, { once: true })
    document.addEventListener('mousemove', restore, { once: true })
    document.addEventListener('click', restore, { once: true })
  }
  
  return (
    <div
      class={`${controlsVisible ? '' : 'hide'} absolute left-0 top-0 flex flex-col justify-between h-full w-full [.hide]:opacity-0 transition-opacity`}
      onClick={togglePlayState}
      onContextMenu={handleContextMenu}
    >

    </div>
  )
}
