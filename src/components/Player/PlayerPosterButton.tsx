import type { TargetedEvent } from 'preact'
import { IconPlay } from '../Icons'
import { Icon } from '../Icon'
import { SHOW_PLAYER_POSTER } from '@/lib/constants'
import { usePlayerStore } from '@/stores/usePlayerStore'

export function PlayerPosterButton () {
  const hasPlayed = usePlayerStore((state) => state.hasPlayed)
  const togglePlayState = usePlayerStore((state) => state.togglePlayState)

  function firstPlayVideo (event: TargetedEvent<HTMLButtonElement>) {
    const button = event.currentTarget
    button.hidden = true
    togglePlayState?.()
  }
  
  return (
    !hasPlayed && SHOW_PLAYER_POSTER && (
      <button
        class='absolute left-1/2 top-1/2 -translate-1/2 h-full w-full flex items-center justify-center cursor-pointer outline-0'
        onClick={firstPlayVideo}
      >
        <div class='flex items-center justify-center h-12 w-18 rounded-2xl [corner-shape:squircle] backdrop-blur pointer-events-none bg-black/80'>
          <Icon class='size-10'>
            <IconPlay />
          </Icon>
        </div>
      </button>
    )
  )
}
