import { IconCast, IconChevron, IconFullScreen, IconNext, IconPlayState, IconResolution, IconSettings, IconSubtitles } from '@/components/ui/Icons'
import { Button } from './Button'
import { usePlayerStore } from '@/stores/usePlayerStore'
import { toggleFullScreen, togglePlayState } from '@/lib/player/playerActions'
import type { Resolution } from '@/types/videoTypes'
import { navigate } from 'astro:transitions/client'

export function MobileControls () {
  const isPlaying = usePlayerStore((state) => state.isPlaying)
  const inFullScreen = usePlayerStore((state) => state.inFullScreen)
  const resolution: Resolution = '4k'
  
  return (
    <div class='relative z-1 h-full w-full transition-colors bg-black/50'>
      <Button class='size-12 left-1.5 top-1.5' icon={IconChevron} iconClass='size-8' onClick={() => navigate('/')} />
      
      {/* Options */}
      <div class='absolute right-2 top-2 flex items-center justify-center gap-1'>
        <Button class='static size-10' icon={IconCast} iconClass='size-6' />
        <Button class='static size-10' icon={() => <IconResolution resolution={resolution} />} iconClass='size-6' />
        <Button class='static size-10' icon={IconSubtitles} iconClass='size-6' />
        <Button class='static size-10' icon={IconSettings} iconClass='size-6' />
      </div>
      
      {/* Playback */}
      <div class='absolute left-1/2 top-1/2 -translate-1/2 flex items-center justify-center gap-4'>
        <Button class='static size-12' icon={() => <IconNext />} iconClass='size-8 rotate-180' />
        <Button class='static size-14' icon={() => <IconPlayState isPlaying={isPlaying} />} iconClass='size-12' onClick={togglePlayState} />
        <Button class='static size-12' icon={() => <IconNext />} iconClass='size-8' />
      </div>

      {/* Time */}
      <Button class='left-1.5 bottom-3.5 w-fit h-fit p-1.5 px-3'>
        <div class='flex items-center justify-center gap-1 text-sm font-medium text-neutral-400'>
          <span class='text-neutral-50'>00:30</span> / <span>04:42</span>
        </div>
      </Button>

      <Button class='size-12 right-1.5 bottom-1.5' icon={() => <IconFullScreen inFullScreen={inFullScreen} />} iconClass='size-6' onClick={toggleFullScreen} />
    </div>
  )
}
