import { hideControls, showControlsAndScheduleHide, toggleCinemaMode, toggleFullScreen, togglePictureInPicture, togglePlayState } from '@/lib/player/playerActions'
import { usePlayerStore } from '@/stores/usePlayerStore'
import { useEffect } from 'preact/hooks'
import { Button } from '../mobile/Button'
import { IconChat, IconCinema, IconFullScreen, IconNext, IconMiniPlayer, IconPlayState, IconResolution, IconSettings, IconSubtitles, IconVolume } from '@/components/ui/Icons'

export function DesktopControls () {
  const areControlsVisible = usePlayerStore((state) => state.areControlsVisible)
  const isPlaying = usePlayerStore((state) => state.isPlaying)
  const playerLayout = usePlayerStore((state) => state.playerLayout)

  useEffect(() => {
    showControlsAndScheduleHide()
  }, [isPlaying])
  
  return (
    <div
      class={`${areControlsVisible ? 'controls' : 'hide'} relative z-1 h-full w-full transition-colors bg-linear-to-t to-20% from-transparent [.controls]:from-black/80 [.hide]:cursor-none`}
      onClick={togglePlayState}
      onMouseMove={showControlsAndScheduleHide}
      onMouseLeave={hideControls}
    >
      <div class={`${areControlsVisible ? '' : 'hide'} relative opacity-100 [.hide]:opacity-0 starting:opacity-0 [.hide]:hidden h-full w-full transition-all transition-discrete`}>
        <div class='absolute left-3 bottom-2 h-fit w-fit flex items-center gap-1'>
          <Button class='static size-10' onClick={togglePlayState} icon={() => <IconPlayState isPlaying={isPlaying} />} iconClass='size-7' />
          <Button class='static size-10' icon={IconNext} iconClass='size-7' />
          <Button class='static size-10' icon={IconVolume} iconClass='size-7' />
        </div>

        <div class='absolute right-3 bottom-2 h-fit w-fit flex items-center gap-1'>
          <Button class='static size-10' icon={IconSubtitles} iconClass='size-7' />
          <Button class='static size-10' icon={() => <IconResolution resolution='hd' />} iconClass='size-7' />
          <Button class='static size-10' icon={IconSettings} iconClass='size-7' />
          <Button class='static size-10' icon={IconChat} iconClass='size-7' />
          <Button class='static size-10' onClick={togglePictureInPicture} icon={IconMiniPlayer} iconClass='size-7' />
          <Button class='static size-10' onClick={toggleCinemaMode} icon={() => <IconCinema active={playerLayout === 'cinema'} />} iconClass='size-7' />
          <Button class='static size-10' onClick={toggleFullScreen} icon={IconFullScreen} iconClass='size-7' />
        </div>
      </div>
    </div>
  )
}
