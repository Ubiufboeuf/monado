import { usePlayerStore } from '@/stores/usePlayerStore'
import { CustomRange as Timeline } from './CustomRange'
import { sleep } from '@/lib/utils'
import type { RefObject } from 'preact'

interface ControlsProps {
  togglePlayState: () => void
  videoRef: RefObject<HTMLVideoElement>
  hidden?: boolean
}

export function Controls ({ togglePlayState, videoRef, hidden }: ControlsProps) {
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
  
  async function handleContextMenuTopSection (event: MouseEvent) {
    const element = event.currentTarget as HTMLElement
    element.style.pointerEvents = 'none'
    await sleep(50)
    element.style.pointerEvents = 'auto'
  }

  function handleTimeUpdate (time: number) {
    if (videoRef.current) videoRef.current.currentTime = time
  }
  
  return (
    <div
      class={`${controlsVisible ? '' : ''} absolute left-0 top-0 flex flex-col justify-between h-full w-full [.hide]:opacity-0 transition-opacity`}
      onContextMenu={handleContextMenu}
      hidden={hidden}
    >
      <section
        class='flex-1 max-h-[calc(100%-68px)] w-full'
        onClick={togglePlayState}
        onContextMenu={handleContextMenuTopSection}
      >
        <h1 class='not-full-screen:hidden'>{video?.title}</h1>
      </section>
      <section
        class='relative bottom-0 w-full h-fit px-2'
      >
        <Timeline
          id='timeline'
          maxValue={video?.duration ?? 100}
          onValueUpdate={handleTimeUpdate}
        />
        {/* Panel inferior */}
      </section>
    </div>
  )
}
