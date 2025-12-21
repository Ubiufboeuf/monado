/* eslint-disable @typescript-eslint/consistent-type-imports */

import type { MediaPlayerClass, MediaPlayerSettingClass } from 'dashjs'

import { useEffect, useRef, useState } from 'preact/hooks'
import { usePlayerStore } from '@/stores/usePlayerStore'
import { errorHandler } from '@/lib/errors'
import type { TargetedEvent } from 'preact'

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
  const [isTogglePlayStored, setIsTogglePlayStored] = useState(false)
  const [isPauseStored, setIsPauseStored] = useState(false)
  const [isPlayStored, setIsPlayStored] = useState(false)
  
  const videoRef = useRef<HTMLVideoElement>(null)
  
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
    const video = videoRef.current
    if (!video) return

    if (video.paused) play()
    else pause()
  }
  
  function storePlayerFunctions () {
    if (!isTogglePlayStored) storeTogglePlay()
    if (!isPauseStored) storePause()
    if (!isPlayStored) storePlay()
  }
  
  function storeTogglePlay () {
    setTogglePlayState(togglePlayState)
    setIsTogglePlayStored(true)
  }

  function storePause () {
    setPause(pause)
    setIsPauseStored(true)
  }

  function storePlay () {
    setPlay(play)
    setIsPlayStored(true)
  }

  storePlayerFunctions()

  function handleTimeUpdate (event: TargetedEvent<HTMLVideoElement>) {
    const video = event.currentTarget
    if (!video) return

    setTime(video.currentTime)
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

    videoElement.setAttribute('style', `--aspectRatio: ${Math.max(1, Number(aspectRatio.replace(':', '/')))}`)
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
