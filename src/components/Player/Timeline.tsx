import { usePlayerStore } from '@/stores/usePlayerStore'
import { CustomRange } from './CustomRange'
import type { RefObject } from 'preact'

interface TimelineProps {
  videoRef: RefObject<HTMLVideoElement>
}

export function Timeline ({ videoRef }: TimelineProps) {
  const video = usePlayerStore((state) => state.video)
  const currentTime = usePlayerStore((state) => state.currentTime)
  const pause = usePlayerStore((state) => state.pause)
  const play = usePlayerStore((state) => state.play)

  function handleTimeUpdate (time: number) {
    if (videoRef.current) videoRef.current.currentTime = time
  }
  
  return (
    <CustomRange
      id='timeline'
      maxValue={video?.duration ?? 100}
      listenForProgress={currentTime}
      onValueUpdate={handleTimeUpdate}
      onMouseDown={pause}
      onMouseUp={play}
      rangeClass='group absolute bottom-14.5 left-1/2 translate-y-1/2 -translate-x-1/2 flex items-center h-5 w-[calc(100%-24px)] cursor-pointer'
      trackClass='absolute flex items-center h-1 group-hover:h-1.5 w-full cursor-pointer rounded-full transition-all duration-300 bg-gray-900/60'
      progressClass='absolute h-1 group-hover:h-1.5 rounded-full transition-[height] duration-300 [background:var(--color-gradient)]'
      thumbClass='absolute left-0 top-1/2 -translate-1/2 size-3 group-hover:size-5 rounded-full transition-[height,width] duration-300 [background:var(--color-gradient)] shadow-2xl'
    />
  )
}
