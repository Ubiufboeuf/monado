import { useRef } from 'preact/hooks'
import { Controls } from './Controls'
import { usePlayer } from '@/hooks/usePlayer'
import { checkPlayState } from '@/lib/playerActions'

export function Player () {  
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const { updateCurrentTime } = usePlayer({ containerRef, videoRef })
  
  return (
    <div
      id='player-container'
      ref={containerRef}
      class='relative w-full h-full desktop:not-cinema:xs:rounded-xl overflow-hidden bg-black'
    >
      <video
        ref={videoRef}
        class='absolute h-full w-full'
        onPlaying={checkPlayState}
        onTimeUpdate={updateCurrentTime}
      />
      <Controls />
    </div>
  )
}
