import { toggleFullScreen } from '@/lib/playerActions'
import { useRef } from 'preact/hooks'

export function Player () {  
  const containerRef = useRef<HTMLDivElement>(null)
  
  return (
    <div
      id='player-container'
      ref={containerRef}
      class='w-full h-full'
    >
      <video
        class='absolute -z-1 h-full w-full'
      />
      <button onClick={toggleFullScreen}>toggle</button>
    </div>
  )
}
