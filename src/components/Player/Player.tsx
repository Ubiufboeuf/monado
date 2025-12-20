import { usePlayer } from '@/hooks/usePlayer'
import { getPoster } from '@/lib/api'
import { AUTO_PLAY } from '@/lib/constants'
import { Icon } from '../Icon'
import { IconPlay } from '../Icons'
import type { TargetedEvent } from 'preact'

interface PlayerProps {
  videoId: string
  autoplay?: boolean
  class?: string
}

export function Player ({ videoId, autoplay = AUTO_PLAY, class: className }: PlayerProps) {
  const {
    videoRef,
    hasPlayed,
    togglePlayState
  } = usePlayer()

  function firstPlayVideo (event: TargetedEvent<HTMLButtonElement>) {
    const button = event.currentTarget
    button.hidden = true
    togglePlayState()
  }
  
  return (
    <div
      class={`${className} relative`}
    >
      <video
        ref={videoRef}
        autoPlay={autoplay}
        poster={getPoster(videoId)}
        onClick={togglePlayState}
      />
      { !hasPlayed && (
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
      ) }
    </div>
  )
}
