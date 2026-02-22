import { usePlayerStore } from '@/stores/usePlayerStore'
import { Timeline } from './Timeline'
import type { RefObject } from 'preact'
import { ControlsTopArea } from './ControlsTopArea'
import { BottomLeftControls } from './BottomLeftControls'
import { BottomRightControls } from './BottomRightControls'
import { PlayerSettingsPanel } from './SettingsPanel/PlayerPanel'
import { useEffect, useRef } from 'preact/hooks'
import { SHOW_PLAYER_POSTER } from '@/lib/constants'

interface ControlsProps {
  videoRef: RefObject<HTMLVideoElement>
}

export function Controls ({ videoRef }: ControlsProps) {
  // const hasPlayed = usePlayerStore((state) => state.hasPlayed)
  // const isPlaying = usePlayerStore((state) => state.isPlaying)

  // const startingPlaybackRef = useRef(false)<
  // const playbackStarted = startingPlaybackRef.current || (hasPlayed && isPlaying)

  function handleContextMenu (event: MouseEvent) {
    const controls = event.currentTarget as HTMLElement
    const topSection = controls.children[0] as HTMLElement

    controls.style.pointerEvents = 'none'

    const restore = () => {
      controls.style.pointerEvents = 'auto'
      topSection.style.pointerEvents = 'auto'

      document.removeEventListener('keydown', restore)
      document.removeEventListener('mousemove', restore)
      document.removeEventListener('click', restore)
    }

    document.addEventListener('keydown', restore, { once: true })
    document.addEventListener('mousemove', restore, { once: true })
    document.addEventListener('click', restore, { once: true })
  }

  useEffect(() => {
    console.log('<Controls /> effect[]')
  }, [])
  
  console.log('<Controls />')
  
  return (
    <div
      class='pointer-coarse:hidden absolute left-0 top-0 flex flex-col justify-between h-full w-full [.hide]:opacity-0 transition-opacity'
      onContextMenu={handleContextMenu}
      // hidden={SHOW_PLAYER_POSTER ? !playbackStarted : undefined}
    >
      <ControlsTopArea />
      <PlayerSettingsPanel />
      <section class='relative bottom-0 w-full h-fit px-2'>
        <Timeline videoRef={videoRef} />
        <div class='flex h-13 justify-between px-1 gap-2'>
          <BottomLeftControls videoRef={videoRef} />
          <BottomRightControls />
        </div>
      </section>
    </div>
  )
}
