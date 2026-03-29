import { Icon } from '@/components/Icon'
import { FloatingButton } from './FloatingButton'
import { IconChat, IconCinema, IconFullScreen, IconNext, IconPip, IconPlayerState, IconResolution, IconSettings, IconSubtitles, IconVolume } from '@/components/Icons'
import { toggleCinemaMode, toggleFullScreen, togglePlayState } from '@/lib/playerActions'
import { usePlayerStore } from '@/stores/usePlayerStore'

export function DesktopControls () {
  const isPlaying = usePlayerStore((state) => state.isPlaying)
  const inCinemaMode = usePlayerStore((state) => state.inCinemaMode)

  return (
    <div class='relative h-full w-full bg-linear-to-t to-20% from-black/50'>
      <div class='absolute bottom-13 left-0 w-full h-1 px-3'>
        <div class='h-1 w-full rounded-full bg-neutral-700' />
      </div>
      <div class='absolute left-3 bottom-2 h-fit w-fit flex items-center gap-2'>
        <FloatingButton class='static size-9' onClick={togglePlayState}>
          <Icon class='size-7'>
            <IconPlayerState isPlaying={isPlaying} />
          </Icon>
        </FloatingButton>
        <FloatingButton class='static size-9'>
          <Icon class='size-7'>
            <IconNext />
          </Icon>
        </FloatingButton>
        <FloatingButton class='static size-9'>
          <Icon class='size-7'>
            <IconVolume />
          </Icon>
        </FloatingButton>
      </div>
      <div class='absolute right-3 bottom-2 h-fit w-fit flex items-center gap-2'>
        <FloatingButton class='static size-9'>
          <Icon class='size-7'>
            <IconSubtitles />
          </Icon>
        </FloatingButton>
        <FloatingButton class='static size-9'>
          <Icon class='size-7'>
            <IconResolution resolution='hd' />
          </Icon>
        </FloatingButton>
        <FloatingButton class='static size-9'>
          <Icon class='size-7'>
            <IconSettings />
          </Icon>
        </FloatingButton>
        <FloatingButton class='static size-9'>
          <Icon class='size-7'>
            <IconChat />
          </Icon>
        </FloatingButton>
        <FloatingButton class='static size-9'>
          <Icon class='size-7'>
            <IconPip />
          </Icon>
        </FloatingButton>
        <FloatingButton class='static size-9' onClick={toggleCinemaMode}>
          <Icon class='size-7'>
            <IconCinema active={inCinemaMode} />
          </Icon>
        </FloatingButton>
        <FloatingButton class='static size-9' onClick={toggleFullScreen}>
          <Icon class='size-7'>
            <IconFullScreen />
          </Icon>
        </FloatingButton>
      </div>
    </div>
  )
}
