import { Icon } from '@/components/Icon'
import { FloatingButton } from './FloatingButton'
import { IconChat, IconCinema, IconFullScreen, IconNext, IconPip, IconPlayerState, IconResolution, IconSettings, IconSubtitles, IconVolume } from '@/components/Icons'
import { toggleCinemaMode, toggleFullScreen, togglePlayState } from '@/lib/playerActions'
import { usePlayerStore } from '@/stores/usePlayerStore'
import { hideControls, showControlsAndScheduleHide } from '@/lib/playerActions'
import { MenuPanel } from './ModalMenuPanel'
import type { TargetedEvent } from 'preact'
import { Slider } from '../Slider'
import { draggedBySlider, mouseDownTarget } from '@/stores/miniStore'

export function DesktopControls () {
  const isPlaying = usePlayerStore((state) => state.isPlaying)
  const inCinemaMode = usePlayerStore((state) => state.inCinemaMode)
  const areControlsVisible = usePlayerStore((state) => state.areControlsVisible)
  const firstPlay = usePlayerStore((state) => state.firstPlay)
  const setFirstPlay = usePlayerStore((state) => state.setFirstPlay)
  const setCurrentMenu = usePlayerStore((state) => state.setCurrentMenu)
  
  function interactWithControls () {
    if (draggedBySlider && mouseDownTarget?.closest('[data-slider-id$=slider]')) return
    
    togglePlayState()

    if (firstPlay) {
      setFirstPlay(false)
      hideControls()
      return
    }
    
    showControlsAndScheduleHide()
  }

  function changeMenu (event: TargetedEvent) {
    const button = event.currentTarget
    if (!(button instanceof HTMLButtonElement)) return

    const { currentMenu } = usePlayerStore.getState()
    let { menuId } = button.dataset
    
    if (menuId === currentMenu) {
      menuId = undefined
    }

    setCurrentMenu(menuId)
  }
  
  return (
    <div
      class={`${areControlsVisible ? 'controls' : ''} relative h-full w-full transition-colors bg-linear-to-t to-20% from-transparent [.controls]:from-black/90 not-[.controls]:cursor-none`}
      onClick={interactWithControls}
      onMouseMove={showControlsAndScheduleHide}
      onMouseLeave={hideControls}
    >
      <div class={`${areControlsVisible ? '' : 'hide'} relative opacity-100 [.hide]:opacity-0 starting:opacity-0 [.hide]:hidden h-full w-full transition-all transition-discrete`}>
        <Slider id='timeline' class='absolute bottom-13 left-0 px-4' />

        <div class='absolute left-3 bottom-2 h-fit w-fit flex items-center gap-1'>
          <FloatingButton class='static size-10' onClick={togglePlayState}>
            <Icon class='size-7'>
              <IconPlayerState isPlaying={isPlaying} />
            </Icon>
          </FloatingButton>
          <FloatingButton class='static size-10'>
            <Icon class='size-7'>
              <IconNext />
            </Icon>
          </FloatingButton>
          <FloatingButton class='static size-10'>
            <Icon class='size-7'>
              <IconVolume />
            </Icon>
          </FloatingButton>
        </div>

        <div class='absolute right-3 bottom-2 h-fit w-fit flex items-center gap-1'>
          <FloatingButton class='static size-10'>
            <Icon class='size-7'>
              <IconSubtitles />
            </Icon>
          </FloatingButton>
          <FloatingButton class='static size-10' onClick={changeMenu} menuId='quality'>
            <Icon class='size-7'>
              <IconResolution resolution='hd' />
            </Icon>
          </FloatingButton>
          <FloatingButton class='static size-10'  onClick={changeMenu} menuId='settings'>
            <Icon class='size-7'>
              <IconSettings />
            </Icon>
          </FloatingButton>
          <FloatingButton class='static size-10'>
            <Icon class='size-7'>
              <IconChat />
            </Icon>
          </FloatingButton>
          <FloatingButton class='static size-10'>
            <Icon class='size-7'>
              <IconPip />
            </Icon>
          </FloatingButton>
          <FloatingButton class='static size-10' onClick={toggleCinemaMode}>
            <Icon class='size-7'>
              <IconCinema active={inCinemaMode} />
            </Icon>
          </FloatingButton>
          <FloatingButton class='static size-10' onClick={toggleFullScreen}>
            <Icon class='size-7'>
              <IconFullScreen />
            </Icon>
          </FloatingButton>
        </div>

        <MenuPanel />
      </div>
    </div>
  )
}
