import { Icon } from '@/components/Icon'
import { IconCast, IconChevronDown, IconFullScreen, IconNext, IconPlayerState, IconResolution, IconSettings, IconSubtitles } from '@/components/Icons'
import { FloatingButton } from './FloatingButton'
import { toggleFullScreen, togglePlayState } from '@/lib/playerActions'
import { navigate } from 'astro:transitions/client'
import { usePlayerStore } from '@/stores/usePlayerStore'

export function MobileControls () {
  const isPlaying = usePlayerStore((state) => state.isPlaying)

  function navigateToHome () {
    navigate('/')
  }

  return (
    <div class='relative h-full w-full bg-black/50'>
      <FloatingButton class='left-3 top-3 size-9' onClick={navigateToHome}>
        <Icon class='size-7'>
          <IconChevronDown />
        </Icon>
      </FloatingButton>

      <div class='absolute right-3 top-3 flex items-center justify-center gap-2'>
        <FloatingButton class='static size-9'>
          <Icon class='size-6'>
            <IconCast />
          </Icon>
        </FloatingButton>
        <FloatingButton class='static size-9'>
          <Icon class='size-6'>
            <IconResolution resolution='hd' />
          </Icon>
        </FloatingButton>
        <FloatingButton class='static size-9'>
          <Icon class='size-6'>
            <IconSubtitles />
          </Icon>
        </FloatingButton>
        <FloatingButton class='static size-9'>
          <Icon class='size-6'>
            <IconSettings />
          </Icon>
        </FloatingButton>
      </div>

      <div class='absolute left-1/2 top-1/2 -translate-1/2 flex items-center justify-center gap-6'>
        <FloatingButton class='static size-9 bg-neutral-700/50'>
          <Icon class='size-7 rotate-180'>
            <IconNext />
          </Icon>
        </FloatingButton>
        <FloatingButton class='static size-12' onClick={togglePlayState}>
          <Icon class='size-10'>
            <IconPlayerState isPlaying={isPlaying} />
          </Icon>
        </FloatingButton>
        <FloatingButton class='static size-9 bg-neutral-700/50'>
          <Icon class='size-7'>
            <IconNext />
          </Icon>
        </FloatingButton>
      </div>
      
      <FloatingButton class='left-3 bottom-3 justify-start w-fit h-fit p-1.5 px-2.5'>
        <div class='flex items-center justify-center gap-1 text-sm font-medium text-neutral-400'>
          <span class='text-neutral-50'>10:32</span> / <span>20:00</span>
        </div>
      </FloatingButton>

      <FloatingButton class='right-3 bottom-3 size-9' onClick={toggleFullScreen}>
        <Icon class='size-6'>
          <IconFullScreen />
        </Icon>
      </FloatingButton>
    </div>
  )
}
