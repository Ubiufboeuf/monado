import { useEffect, useRef, useState } from 'preact/hooks'
import { MobileControls } from './MobileControls/MobileControls'
import { Controls } from './Controls/Controls'
import { useUIStore } from '@/stores/useUIStore'

export function Player () {  
  const containerRef = useRef<HTMLDivElement>(null)
  const isDesktop = useUIStore((state) => state.deviceType === 'desktop')
  const [hydrated, setHydrated] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    if (hydrated === undefined) setHydrated(true)
  }, [hydrated])
  
  return (
    <div
      id='player-container'
      ref={containerRef}
      class='relative w-full h-full desktop:not-cinema:xs:rounded-xl overflow-hidden bg-black'
    >
      <video
        class='absolute -z-1 h-full w-full'
      />
      { (hydrated === undefined) ? undefined : isDesktop
        ? <Controls />
        : <MobileControls />
      }
    </div>
  )
}
