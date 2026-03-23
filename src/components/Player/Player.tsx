import { useRef } from 'preact/hooks'
import { Controls } from './Controls'

export function Player () {  
  const containerRef = useRef<HTMLDivElement>(null)
  
  return (
    <div
      id='player-container'
      ref={containerRef}
      class='relative w-full h-full desktop:not-cinema:xs:rounded-xl overflow-hidden bg-black'
    >
      <video
        class='absolute h-full w-full'
      />
      <Controls />
    </div>
  )
}
