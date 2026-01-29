/* eslint-disable @typescript-eslint/consistent-type-imports */

import type { MediaPlayerClass, MediaPlayerSettingClass } from 'dashjs'

import { useEffect, useRef, useState } from 'preact/hooks'
import { usePlayerStore } from '@/stores/usePlayerStore'
import { errorHandler } from '@/lib/errors'
import type { TargetedEvent } from 'preact'
import { DEFAULT_ASPECT_RATIO } from '@/lib/constants'

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
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const isTogglePlayStoredRef = useRef(false)
  const isPauseStoredRef = useRef(false)
  const isPlayStoredRef = useRef(false)
  
  const video = usePlayerStore((state) => state.video)
  const isPlaying = usePlayerStore((state) => state.isPlaying)
  const hasPlayed = usePlayerStore((state) => state.hasPlayed)
  const setHasPlayed = usePlayerStore((state) => state.setHasPlayed)
  const setElement = usePlayerStore((state) => state.setElement)
  const setIsPlaying = usePlayerStore((state) => state.setIsPlaying)
  const setTime = usePlayerStore((state) => state.setCurrentTime)
  const setTogglePlayState = usePlayerStore((state) => state.setTogglePlayState)
  const setPause = usePlayerStore((state) => state.setPause)
  const setPlay = usePlayerStore((state) => state.setPlay)
  
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
      // player.initialize(videoElement, mpdPath, false, timeSeen)
      // setIsPlayerInitialized(true)
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
    const video = videoRef.current
    if (!video) return

    if (video.paused) play()
    else pause()
  }
  
  function storePlayerFunctions () {
    if (!isTogglePlayStoredRef.current) storeTogglePlay()
    if (!isPauseStoredRef.current) storePause()
    if (!isPlayStoredRef.current) storePlay()
  }
  
  function storeTogglePlay () {
    setTogglePlayState(togglePlayState)
    isTogglePlayStoredRef.current = true
  }

  function storePause () {
    setPause(pause)
    isPauseStoredRef.current = true
  }

  function storePlay () {
    setPlay(play)
    isPlayStoredRef.current = true
  }

  storePlayerFunctions()

  function handleTimeUpdate (event: TargetedEvent<HTMLVideoElement>) {
    const video = event.currentTarget
    if (!video) return

    setTime(video.currentTime)
  }

  useEffect(() => {
    importDashjs()

    return () => {
      // Borrar las funciones guardadas en la store para evitar problemas
      setTogglePlayState(undefined)
      setPlay(undefined)
      setPause(undefined)
    }
  }, [])

  useEffect(() => {
    if (!dashjs || !video) return
    
    createPlayer()
      .then(initPlayer)
  }, [dashjs, video])

  useEffect(() => {
    const videoElement = videoRef.current
    const aspectRatio = video?.aspect_ratio ?? DEFAULT_ASPECT_RATIO

    if (!videoElement) return

    const controlledAspectRatio = `${Math.max(1, Number(aspectRatio.replace(':', '/')))}`
    videoElement.style.aspectRatio = controlledAspectRatio
  }, [video, videoRef.current])

  useEffect(() => {
    const video = videoRef.current
    if (video) setElement(video)
  }, [videoRef.current])

  return {
    videoRef,
    hasPlayed,
    isPlaying,
    togglePlayState,
    handlePlayVideo,
    handleTimeUpdate
  }
}
