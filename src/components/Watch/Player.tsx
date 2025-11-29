/* eslint-disable @typescript-eslint/consistent-type-imports */
import { errorHandler } from '@/lib/errors'
import { usePlayerStore } from '@/stores/usePlayerStore'
import type { MediaPlayerClass, MediaPlayerSettingClass } from 'dashjs'
import type { CSSProperties } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'

const playerSettings: MediaPlayerSettingClass = {
  streaming: {
    abr: {
      autoSwitchBitrate: {
        audio: false,
        video: false
      }
    }
  }
}

export function Player ({ class: className, style }: { class?: string, style?: CSSProperties }) {
  type DashJS = typeof import('/home/mango/Dev/monado/node_modules/dashjs/index')

  const [dashjs, setDashjs] = useState<DashJS>()
  const [playerInitialized, setPlayerInitialized] = useState(false)
  const playerRef = useRef<MediaPlayerClass>()
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const video = usePlayerStore((state) => state.video)
  const setPlayer = usePlayerStore((state) => state.setPlayer)

  async function importDashjs () {
    return import('dashjs')
      .then((dashjs) => {
        setDashjs(dashjs)
        return dashjs
      })
  }

  async function createPlayer () {
    let player = playerRef.current
    if (player) return player
    
    if (!dashjs) return
    // No importo dashjs si no tiene valor para evitar un bucle por cómo se ejecuta esto

    player = dashjs?.MediaPlayer().create()
    if (player) {
      playerRef.current = player
      return player
    }

    console.error('Error creando el reproductor')
  }

  function initPlayer (player: MediaPlayerClass | undefined) {
    if (!player || playerInitialized) return

    const videoElement = videoRef.current
    const mpdPath = video?.source
    const autoPlay = false
    const timeSeen = 0
    
    if (!videoElement || !mpdPath) return

    player.updateSettings(playerSettings)
    try {
      player.initialize(videoElement, mpdPath, autoPlay, timeSeen)
      setPlayerInitialized(true)
    } catch (err) {
      errorHandler(err, 'Error inicializando el reproductor')
    }
  }

  useEffect(() => {    
    importDashjs()

    const video = videoRef.current
    if (!video) return

    setPlayer(video)
  }, [])

  useEffect(() => {
    if (!dashjs || !video) return

    createPlayer()
      .then((player) => initPlayer(player))
  }, [dashjs, video])
  
  return (
    <div
      class={`${className} relative`}
      style={style}
    >
      <video
        ref={videoRef}
        class='w-full max-h-[calc(100cqw*9/16)] lg:max-h-auto lg:h-full'
      />
      {/* controles */}
      <div class='absolute left-0 top-0 h-full w-full'>
        
      </div>
    </div>
  )
}
