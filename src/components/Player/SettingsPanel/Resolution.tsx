import { usePlayerStore } from '@/stores/usePlayerStore'
import type { ResolutionMetadata } from '@/types/videoTypes'
import type { ReactNode } from 'preact/compat'

interface ResolutionProps {
  class?: string
  resolution?: ResolutionMetadata | null
  children: ReactNode
}

export function Resolution ({ class: className, resolution, children }: ResolutionProps) {
  if (!resolution) return
  
  const player = usePlayerStore((state) => state.player)
  
  function changeResolution () {
    if (!resolution) return
    
    const representations = player?.getRepresentationsByType('video')
    const rep = representations?.find((rep) => rep.id.includes(resolution.id))
    
    if (!rep) return

    player?.setRepresentationForTypeById('video', rep.id, true)
  }

  return (
    <button
      class={`${className} w-full h-10 rounded-md cursor-pointer transition-colors hover:bg-neutral-700/70`}
      onClick={changeResolution}
    >
      {children}
    </button>
  )
}
