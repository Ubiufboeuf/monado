import { Icon } from '@/components/Icon'
import { IconCast, IconChevronDown, IconFullScreen, IconNext, IconPlayerState, IconResolution, IconSettings, IconSubtitles } from '@/components/Icons'
import { FloatingButton } from './FloatingButton'
import { backwardTime, forwardTime, toggleControlsVisibility, toggleFullScreen, togglePlayState } from '@/lib/player/playerActions'
import { navigate } from 'astro:transitions/client'
import { usePlayerStore } from '@/stores/usePlayerStore'
import { parseDuration } from '@/lib/parsers'
import { useDoubleTap } from '@/hooks/useDoubleTap'
import { DEFAULT_DOUBLE_TAP_DELAY } from '@/lib/constants'

export function MobileControls () {
  const isPlaying = usePlayerStore((state) => state.isPlaying)
  const areControlsVisible = usePlayerStore((state) => state.areControlsVisible)
  const currentTime = usePlayerStore((state) => state.currentTime)
  const videoDuration = usePlayerStore((state) => state.duration)

  const handleLeftTap = useDoubleTap(backwardTime, toggleControlsVisibility, DEFAULT_DOUBLE_TAP_DELAY)
  const handleRightTap = useDoubleTap(forwardTime, toggleControlsVisibility, DEFAULT_DOUBLE_TAP_DELAY)

  function navigateToHome () {
    navigate('/')
  }

  return (
    <div
      class={`${areControlsVisible ? 'controls' : ''} relative h-full w-full transition-colors [.controls]:bg-black/50`}
      onClick={toggleControlsVisibility}
    >
      <FloatingButton class='left-0 top-0 h-full w-4/10 rounded-none border-none outline-none transition-none bg-transparent shr:bg-transparent' onClick={handleLeftTap} disableDefaultBehavior />
      <FloatingButton class='right-0 top-0 h-full w-4/10 rounded-none border-none outline-none transition-none bg-transparent shr:bg-transparent' onClick={handleRightTap} disableDefaultBehavior />

      <div class='relative h-full w-full pointer-events-none *:pointer-events-auto' hidden={!areControlsVisible}>
        <FloatingButton class='left-3 top-3 size-9' onClick={navigateToHome}>
          <Icon class='size-7'>
            <IconChevronDown />
          </Icon>
        </FloatingButton>

        <div class='absolute right-2 top-2 flex items-center justify-center gap-1'>
          <FloatingButton class='static size-10'>
            <Icon class='size-6'>
              <IconCast />
            </Icon>
          </FloatingButton>
          <FloatingButton class='static size-10'>
            <Icon class='size-6'>
              <IconResolution resolution='hd' />
            </Icon>
          </FloatingButton>
          <FloatingButton class='static size-10'>
            <Icon class='size-6'>
              <IconSubtitles />
            </Icon>
          </FloatingButton>
          <FloatingButton class='static size-10'>
            <Icon class='size-6'>
              <IconSettings />
            </Icon>
          </FloatingButton>
        </div>

        <div class='absolute left-1/2 top-1/2 -translate-1/2 flex items-center justify-center gap-6'>
          <FloatingButton class='static size-9 bg-neutral-400/20'>
            <Icon class='size-7 rotate-180'>
              <IconNext />
            </Icon>
          </FloatingButton>
          <FloatingButton class='static size-12' onClick={togglePlayState}>
            <Icon class='size-10'>
              <IconPlayerState isPlaying={isPlaying} />
            </Icon>
          </FloatingButton>
          <FloatingButton class='static size-9 bg-neutral-400/20'>
            <Icon class='size-7'>
              <IconNext />
            </Icon>
          </FloatingButton>
        </div>
        
        <FloatingButton class='left-3 bottom-3 justify-start w-fit h-fit p-1.5 px-2.5'>
          <div class='flex items-center justify-center gap-1 text-sm font-medium text-neutral-400'>
            { videoDuration !== undefined && <>
              <span class='text-neutral-50'>{parseDuration(currentTime ?? 0)}</span> / <span>{parseDuration(videoDuration ?? 0)}</span>
            </> }
          </div>
        </FloatingButton>

        <FloatingButton class='right-3 bottom-3 size-9' onClick={toggleFullScreen}>
          <Icon class='size-6'>
            <IconFullScreen />
          </Icon>
        </FloatingButton>
      </div>
    </div>
  )
}
