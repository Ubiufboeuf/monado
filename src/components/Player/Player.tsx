import { toggleFullScreen } from '@/lib/playerActions'
import { useRef } from 'preact/hooks'

export function Player () {  
  const containerRef = useRef<HTMLDivElement>(null)
  
  return (
    <div
      id='player-container'
      ref={containerRef}
      class='relative w-full h-full desktop:not-cinema:xs:rounded-xl overflow-hidden bg-black'
    >
      <video
        class='absolute -z-1 h-full w-full'
      />
      <button onClick={toggleFullScreen}>toggle</button>
    </div>
  )
}
