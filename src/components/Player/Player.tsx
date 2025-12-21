import { usePlayer } from '@/hooks/usePlayer'
import { getPoster } from '@/lib/api'
import { AUTO_PLAY, SHOW_PLAYER_POSTER } from '@/lib/constants'
import { PlayerPosterButton } from './PlayerPosterButton'
import { Controls } from './Controls'
import { useState } from 'preact/hooks'

interface PlayerProps {
  videoId: string
  autoplay?: boolean
  class?: string
}

export function Player ({ videoId, autoplay = AUTO_PLAY, class: className }: PlayerProps) {
  const {
    videoRef,
    hasPlayed,
    isPlaying,
    togglePlayState,
    handlePlayVideo,
    handleTimeUpdate
  } = usePlayer()
  
  const [playbackStarted, setPlaybackStarted] = useState(false)

  function startPlayback () {
    if (playbackStarted) return
    setPlaybackStarted(hasPlayed && isPlaying)
  }

  if (!playbackStarted) startPlayback()
  
  return (
    <div
      class={`${className} relative`}
    >
      <video
        ref={videoRef}
        class='w-full h-auto cinema:h-full cinema:w-auto aspect-(--aspectRatio) lg:aspect-video'
        style={{ '--aspectRatio': '16/9' }}
        autoPlay={autoplay}
        poster={SHOW_PLAYER_POSTER ? getPoster(videoId) : undefined}
        onPlay={handlePlayVideo}
        onTimeUpdate={handleTimeUpdate}
      />
      <Controls
        videoRef={videoRef}
        hidden={SHOW_PLAYER_POSTER ? !playbackStarted : undefined}
      />
      <PlayerPosterButton hasPlayed={hasPlayed} togglePlayState={togglePlayState} />
      {/* <TouchableControls /> */}
    </div>
  )
}
