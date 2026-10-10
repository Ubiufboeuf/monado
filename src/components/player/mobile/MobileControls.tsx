import { IconPlayState } from '@/components/ui/Icons'
import { Button } from './Button'
import { usePlayerStore } from '@/stores/usePlayerStore'
import { togglePlayState } from '@/lib/player/playerActions'

export function MobileControls () {
  const isPlaying = usePlayerStore((state) => state.isPlaying)
  
  return (
    <div class='relative z-1 h-full w-full transition-colors bg-black/50'>
      <Button class='size-12 left-1/2 top-1/2 -translate-1/2' icon={() => <IconPlayState isPlaying={isPlaying} />} iconClass='size-10' onClick={togglePlayState} />
    </div>
  )
}
