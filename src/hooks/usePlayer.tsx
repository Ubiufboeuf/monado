import { createDashPlayer } from '@/lib/player/createDashPlayer'
import { importDashjs } from '@/lib/player/dashjsLoader'
import { destroyPlayer, initPlayer } from '@/services/playerService'
import { usePlayerStore } from '@/stores/usePlayerStore'
import type { DashJS } from '@/types/playerTypes'
import type { MediaPlayerClass } from 'dashjs'
import type { RefObject } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'

interface Props {
  containerRef: RefObject<HTMLDivElement>
  videoRef: RefObject<HTMLVideoElement>
}

export function usePlayer ({ videoRef }: Props) {
  const [dashjs, setDashjs] = useState<DashJS>()

  const playerRef = useRef<MediaPlayerClass>()

  const video = usePlayerStore((state) => state.video)

  useEffect(() => {
    importDashjs()
      .then(setDashjs)
  }, [])
  
  useEffect(() => {
    if (!dashjs || !video || !videoRef.current) return

    destroyPlayer(playerRef.current)

    const player = createDashPlayer(dashjs)
    playerRef.current = player

    initPlayer(player, videoRef.current, video.source)
  }, [dashjs, video])
}
