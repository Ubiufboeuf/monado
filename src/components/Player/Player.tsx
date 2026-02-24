import { usePlayer } from '@/hooks/usePlayer'
import { getPoster } from '@/services/videoService'
import { AUTO_PLAY, SHOW_PLAYER_POSTER } from '@/lib/constants'
import { PlayerPosterButton } from './PlayerPosterButton'
import { Controls } from './Controls'
import { TouchableControls } from './TouchableControls'
import { usePlayerStore } from '@/stores/usePlayerStore'

interface PlayerProps {
  videoId: string
  autoplay?: boolean
}

export function Player ({ videoId, autoplay = AUTO_PLAY }: PlayerProps) {
  const {
    videoRef,
    handleTimeUpdate
  } = usePlayer()
  
  const setHasPlayed = usePlayerStore((state) => state.setHasPlayed)
  
  function handleOnPlay () {
    setHasPlayed(true)
  }
  
  console.log('Player')
  
  return (
    <div class='relative flex justify-center w-full h-fit cinema:h-full max-w-full max-h-full select-none'>
      <video
        ref={videoRef}
        class='w-full h-auto cinema:h-[70dvh] cinema:max-h-[calc(100cqw/(var(--aspectRatio)))] cinema:w-auto aspect-(--aspectRatio) lg:aspect-video cinema:full-screen:h-full'
        style={{ '--aspectRatio': '16/9' }}
        autoPlay={autoplay}
        poster={SHOW_PLAYER_POSTER ? getPoster(videoId) : undefined}
        onPlay={handleOnPlay}
        onTimeUpdate={handleTimeUpdate}
      />
      <Controls videoRef={videoRef} />
      <TouchableControls />
      <PlayerPosterButton />
    </div>
  )
}
