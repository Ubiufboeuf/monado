import { usePlayerStore } from '@/stores/usePlayerStore'

interface ControlsProps {
  togglePlayState: () => void
  hidden?: boolean
}

export function Controls ({ togglePlayState, hidden }: ControlsProps) {
  const video = usePlayerStore((state) => state.video)
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
      onContextMenu={handleContextMenu}
      hidden={hidden}
    >
      <section
        class='flex-1 max-h-[calc(100%-68px)] w-full'
        onClick={togglePlayState}
      >
        <h1 class='not-full-screen:hidden'>{video?.title}</h1>
      </section>
      <section
        class='relative bottom-0 w-full h-fit px-2'
      >
        {/* <CustomRange /> */}
        {/* Panel inferior */}
      </section>
    </div>
  )
}
