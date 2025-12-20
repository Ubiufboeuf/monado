import { usePlayer } from '@/hooks/usePlayer'
import { getPoster } from '@/lib/api'
import { AUTO_PLAY } from '@/lib/constants'
import { VideoPosterButton } from './VideoPosterButton'
import { Controls } from './Controls'

interface PlayerProps {
  videoId: string
  autoplay?: boolean
  class?: string
}

export function Player ({ videoId, autoplay = AUTO_PLAY, class: className }: PlayerProps) {
  const {
    videoRef,
    hasPlayed,
    togglePlayState,
    handlePlayVideo
  } = usePlayer()
  
  return (
    <div
      class={`${className} relative`}
    >
      <video
        ref={videoRef}
        class='w-full h-auto cinema:h-full cinema:w-auto aspect-(--aspectRatio) lg:aspect-video'
        style={{ '--aspectRatio': '16/9' }}
        autoPlay={autoplay}
        poster={getPoster(videoId)}
        onPlay={handlePlayVideo}
      />
      <Controls
        togglePlayState={togglePlayState}
      />
      <VideoPosterButton hasPlayed={hasPlayed} togglePlayState={togglePlayState} />
      {/* <TouchableControls /> */}
    </div>
  )
}
