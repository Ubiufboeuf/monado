/* eslint-disable @typescript-eslint/consistent-type-imports */

import type { MediaPlayerClass, MediaPlayerSettingClass } from 'dashjs'

import { useEffect, useRef, useState } from 'preact/hooks'
import { usePlayerStore } from '@/stores/usePlayerStore'
import { errorHandler } from '@/lib/errors'

const playerSettings: MediaPlayerSettingClass = {
  streaming: { abr: { autoSwitchBitrate: {
    audio: false,
    video: false
  } } }
}

export function usePlayer () {
  type DashJS = typeof import('/home/mango/Dev/monado/node_modules/dashjs/index')
  
  const [dashjs, setDashjs] = useState<DashJS>()
  const [player, setPlayer] = useState<MediaPlayerClass>()
  const [isPlayerInitialized, setIsPlayerInitialized] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasPlayed, setHasPlayed] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)

  const video = usePlayerStore((state) => state.video)
  
  async function importDashjs () {
    return import('dashjs')
      .then((dashjs) => {
        setDashjs(dashjs)
        return dashjs
      })
  }

  async function createPlayer () {
    let newPlayer = player
    if (newPlayer) return newPlayer

    if (!dashjs) {
      console.error('Falta importar dashjs')
      return
    }
    
    newPlayer = dashjs?.MediaPlayer().create()
    if (newPlayer) {
      setPlayer(newPlayer)
      return newPlayer
    }

    console.error('Error creando el reproductor')
  }

  function initPlayer (player: MediaPlayerClass | undefined) {
    if (!player) return
    const videoElement = videoRef.current

    if (!videoElement) return
    
    if (isPlayerInitialized && video) {
      player.attachSource(video.source)
      play()
      return
    }

    const mpdPath = video?.source
    const timeSeen = 0
    
    if (!mpdPath) return
    
    player.updateSettings(playerSettings)
    try {
      player.initialize(videoElement, mpdPath, false, timeSeen)
      setIsPlayerInitialized(true)
    } catch (err) {
      errorHandler(err, 'Error inicializando el reproductor')
    }
  }

  function play () {
    const video = videoRef.current
    if (!video) return

    const handlePlaySuccess = () => {
      setIsPlaying(true)
      setHasPlayed(true)
    }

    const handlePlayError = (err: unknown) => {
      errorHandler(err, 'Error reproduciendo el video', 'dev')
    }
    
    video.play()
      .then(handlePlaySuccess)
      .catch(handlePlayError)
  }

  function handlePlayVideo () {
    setHasPlayed(true)
  }

  function pause () {
    const video = videoRef.current
    if (!video) return

    video.pause()
    setIsPlaying(false)
  }

  function togglePlayState () {
    if (isPlaying) pause()
    else play()
  }

  useEffect(() => {
    importDashjs()
  }, [])

  useEffect(() => {
    if (!dashjs || !video) return
    
    createPlayer()
      .then(initPlayer)
  }, [dashjs, video])

  useEffect(() => {
    const videoElement = videoRef.current
    const aspectRatio = video?.aspect_ratio
    if (!videoElement || !aspectRatio) return

    videoElement.setAttribute('style', `--aspectRatio: ${aspectRatio.replace(':', '/')}`)
  }, [video, videoRef.current])

  return {
    videoRef,
    hasPlayed,
    togglePlayState,
    handlePlayVideo
  }
}
