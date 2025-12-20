import { usePlayerStore } from '@/stores/usePlayerStore'
import { CustomRange as Timeline } from './CustomRange'
import type { RefObject } from 'preact'
import { ControlsBottomPanel } from './ControlsBottomPanel'
import { ControlsTopArea } from './ControlsTopArea'

interface ControlsProps {
  videoRef: RefObject<HTMLVideoElement>
  hidden?: boolean
}

export function Controls ({ videoRef, hidden }: ControlsProps) {
  const video = usePlayerStore((state) => state.video)
  const controlsVisible = usePlayerStore((state) => state.controlsVisible)
  // const isPlaying = usePlayerStore((state) => state.isPlaying)
  const currentTime = usePlayerStore((state) => state.currentTime)

  function handleContextMenu (event: MouseEvent) {
    const controls = event.currentTarget as HTMLElement
    const topSection = controls.children[0] as HTMLElement

    controls.style.pointerEvents = 'none'

    const restore = () => {
      controls.style.pointerEvents = 'auto'
      topSection.style.pointerEvents = 'auto'

      document.removeEventListener('keydown', restore)
      document.removeEventListener('mousemove', restore)
      document.removeEventListener('click', restore)
    }

    document.addEventListener('keydown', restore, { once: true })
    document.addEventListener('mousemove', restore, { once: true })
    document.addEventListener('click', restore, { once: true })
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
      <ControlsTopArea /> 
      <section
        class='relative bottom-0 w-full h-fit px-2'
      >
        <Timeline
          id='timeline'
          maxValue={video?.duration ?? 100}
          listenForProgress={currentTime}
          onValueUpdate={handleTimeUpdate}
          rangeClass='group absolute bottom-14.5 left-1/2 translate-y-1/2 -translate-x-1/2 flex items-center h-5 w-[calc(100%-24px)] cursor-pointer'
          trackClass='absolute flex items-center h-1 group-hover:h-1.5 w-full cursor-pointer rounded-full transition-all duration-300 bg-gray-900/60'
          progressClass='absolute h-1 group-hover:h-1.5 rounded-full transition-[height] duration-300 [background:var(--color-gradient)]'
          thumbClass='absolute left-0 top-1/2 -translate-1/2 size-3 group-hover:size-5 rounded-full transition-[height,width] duration-300 [background:var(--color-gradient)] shadow-2xl'
        />
        <ControlsBottomPanel
          videoRef={videoRef}
        />
      </section>
    </div>
  )
}
