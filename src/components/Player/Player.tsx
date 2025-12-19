/* eslint-disable @typescript-eslint/consistent-type-imports */
import { errorHandler } from '@/lib/errors'
import { usePlayerStore } from '@/stores/usePlayerStore'
import type { MediaPlayerClass, MediaPlayerSettingClass } from 'dashjs'
import type { CSSProperties } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'
import { Icon } from '../Icon'
import { IconNext, IconPause, IconPlay, IconVolume } from '../Icons'
import { parseDuration } from '@/lib/parsers'
import { navigate } from 'astro/virtual-modules/transitions-router.js'
import { useVideosStore } from '@/stores/useVideosStore'
import { getRandomItem } from '@/lib/utils'
import { INITIAL_VOLUME } from '@/lib/constants'

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

export function Player ({ autoplay, class: className, style }: { autoplay?: boolean, class?: string, style?: CSSProperties }) {
  type DashJS = typeof import('/home/mango/Dev/monado/node_modules/dashjs/index')

  const isMouseDownRef = useRef(false)
  const pausedForDraggingRef = useRef(false)
  const pausedForErrorRef = useRef(false)
  const playAfterDragRef = useRef(autoplay)
  const controlsTimeoutId = useRef<NodeJS.Timeout | null>(null)
  const initialVolumeSettedRef = useRef(false)

  const [dashjs, setDashjs] = useState<DashJS>()
  const [playerInitialized, setPlayerInitialized] = useState(false)
  const [autoplayBlocked, setAutoplayBlocked] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(INITIAL_VOLUME)
  const [controlsVisible, setControlsVisible] = useState(false)
  
  const playerRef = useRef<MediaPlayerClass>()
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const timelineRef = useRef<HTMLDivElement | null>(null)
  const timeseenRef = useRef<HTMLDivElement | null>(null)
  const timelineThumbRef = useRef<HTMLDivElement | null>(null)
  const volumeRef = useRef<HTMLDivElement | null>(null)
  const volumeLevelRef = useRef<HTMLDivElement | null>(null)
  const volumeThumbRef = useRef<HTMLDivElement | null>(null)
  const canHideControlsRef = useRef(true)
  const canHideCursorRef = useRef(true)
  const mouseTargetRef = useRef<HTMLElement | null>(null)
  const randomSelectorId = useRef<string | undefined>(undefined)
  
  const video = usePlayerStore((state) => state.video)
  const setPlayer = usePlayerStore((state) => state.setPlayer)
  const isPlaying = usePlayerStore((state) => state.isPlaying)
  const setIsPlaying = usePlayerStore((state) => state.setIsPlaying)
  const suggestedVideos = useVideosStore((state) => state.suggestedVideos)

  setInitialVolume()

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
    if (!player) return
    const videoElement = videoRef.current

    if (!videoElement) return
    
    if (playerInitialized && video) {
      player.attachSource(video.source)
      tryPlayVideo()
      return
    }

    const mpdPath = video?.source
    const timeSeen = 0
    
    if (!mpdPath) return
    
    player.updateSettings(playerSettings)
    try {
      player.initialize(videoElement, mpdPath, false, timeSeen)
      setPlayerInitialized(true)
    } catch (err) {
      errorHandler(err, 'Error inicializando el reproductor')
    }
  }

  function handlePressTimeline (event: MouseEvent) {
    // console.log('press', isMouseDown && 'mouse down')
    // if (isMouseDown) return
    isMouseDownRef.current = true
    mouseTargetRef.current = event.target as HTMLElement
    
    if (!pausedForErrorRef.current) {
      pause()
      pausedForDraggingRef.current = true
    }

    if (timelineRef.current) {
      const { x } = event
      const { left, width } = timelineRef.current.getBoundingClientRect()
      const start = left
      const end = width
      const percent = (x - start) / (end) // <- solo para el tiempo
      
      const time = Math.max(0, Math.min(percent * duration, duration))
      const position = Math.max(0, Math.min(x - start, end))
      if (videoRef.current) videoRef.current.currentTime = time
      setCurrentTime(time)
      
      if (timeseenRef.current) timeseenRef.current.style.width = `${position}px`
      if (timelineThumbRef.current) timelineThumbRef.current.style.left = `${position}px`
    }
    
    window.addEventListener('mousemove', handleDragTimeline)
  }

  function handleDragTimeline (event: MouseEvent) {
    if (!mouseTargetRef.current?.closest('#timeline')) return
    
    if (!isMouseDownRef.current) return
    
    if (!timelineRef.current) return

    const { x } = event
    const { left, width } = timelineRef.current.getBoundingClientRect()
    const start = left
    const end = width
    const percent = (x - start) / (end) // <- solo para el tiempo

    const time = Math.max(0, Math.min(percent * duration, duration))
    const position = Math.max(0, Math.min(x - start, end))
    if (videoRef.current) videoRef.current.currentTime = time
    setCurrentTime(time)

    if (timeseenRef.current) timeseenRef.current.style.width = `${position}px`
    if (timelineThumbRef.current) timelineThumbRef.current.style.left = `${position}px`
  }

  function handlePressVolme (event: MouseEvent) {
    isMouseDownRef.current = true
    mouseTargetRef.current = event.target as HTMLElement
    
    if (volumeRef.current) changeVolume(event, volumeRef.current)
    
    window.addEventListener('mousemove', handleDragVolume)
  }

  function handleDragVolume (event: MouseEvent) {
    if (!mouseTargetRef.current?.closest('#volume') || !isMouseDownRef.current || !volumeRef.current) return

    changeVolume(event, volumeRef.current)
  }
  
  function changeVolume (event: MouseEvent, volumeElement: HTMLDivElement, updateState = true) {
    const volumeThumb = volumeThumbRef.current
    const thumbWidth = volumeThumbRef.current?.getBoundingClientRect().width ?? 0
    const halfThumbWidth = thumbWidth / 2

    const { x } = event
    const { left: volumeLeft, width: volumeWidth } = volumeElement.getBoundingClientRect()
    const maxScroll = volumeWidth - 4 - thumbWidth
    const thumbPosition = Math.max(0, Math.min(x - volumeLeft - 2 - halfThumbWidth, maxScroll))
    const volume = thumbPosition / maxScroll
    const position = thumbPosition + halfThumbWidth
    
    if (updateState) setVolume(volume)
    if (videoRef.current) videoRef.current.volume = volume    
    if (volumeLevelRef.current) volumeLevelRef.current.style.width = `${position}px`
    if (volumeThumb) volumeThumb.style.left = `${thumbPosition}px`
  }

  function syncVolumeUI () {
    const video = videoRef.current
    const volumeElement = volumeRef.current
    const volumeThumb = volumeThumbRef.current
    if (!video || !volumeElement || !volumeThumb) return

    const { volume } = video
    const { width: volumeWidth } = volumeElement.getBoundingClientRect()
    const { width: thumbWidth } = volumeThumb.getBoundingClientRect()

    const halfThumbWidth = thumbWidth / 2
    const maxScroll = volumeWidth - 4 - thumbWidth
    
    const volumeLevelWidth = volumeWidth * volume - 4
    const thumbPosition = Math.max(0, Math.min((volume * volumeWidth) - 2 - halfThumbWidth, maxScroll))
    
    if (volumeLevelRef.current) volumeLevelRef.current.style.width = `${volumeLevelWidth}px`
    if (volumeThumb) volumeThumb.style.left = `${thumbPosition}px`
  }

  function handleMouseUp () {
    // console.log('mouse up')
    isMouseDownRef.current = false
    mouseTargetRef.current = null

    if (pausedForDraggingRef.current && playAfterDragRef.current) {
      play()
      pausedForDraggingRef.current = false
    }

    window.removeEventListener('mousemove', handleDragTimeline)
  }

  function handleTimeUpdate () {
    const video = videoRef.current
    if (!video) return

    const { currentTime } = video
    setCurrentTime(currentTime)
    
    const currentTimePercent = `${currentTime * 100 / duration}%`

    if (timeseenRef.current) timeseenRef.current.style.width = currentTimePercent
    if (timelineThumbRef.current) timelineThumbRef.current.style.left = currentTimePercent
  }

  const play = () => setIsPlaying(true)
  const pause = () => setIsPlaying(false)
  function togglePlayerState () {
    showControls()
    playAfterDragRef.current = false
    return isPlaying ? pause() : play()
  }

  const handleChangeResolution = (id: string) => () => {
    const player = playerRef.current
    if (!player || !video) return

    const videoRepresentations = player.getRepresentationsByType('video')
    
    const representation = videoRepresentations.find((r) => r.height === video.resolutionsById[id].height)
    if (!representation) {
      console.log(`Representación de id (${id}) no encontrada`, representation)
      return
    }

    player.setRepresentationForTypeById('video', representation.id, true)
  }

  function clearControlsTimeout () {
    document.documentElement.style.cursor = 'default'
    if (controlsTimeoutId.current) {
      clearTimeout(controlsTimeoutId.current)
      controlsTimeoutId.current = null
    }
  }

  function resetControlsTimeout () {
    clearControlsTimeout()

    if (!canHideControlsRef.current) return

    const id = setTimeout(() => {
      setControlsVisible(false)
      controlsTimeoutId.current = null
      if (canHideCursorRef.current) document.documentElement.style.cursor = 'none'
    }, 2000)

    controlsTimeoutId.current = id
  }

  function showControls () {
    setControlsVisible(true)
    resetControlsTimeout()
  }

  function handleMouseMove () {
    showControls()
  }

  function handleHoverControls () {
    canHideControlsRef.current = false
    clearControlsTimeout()
  }

  function handleLeaveControls () {
    canHideControlsRef.current = true
    resetControlsTimeout()
  }

  function enableCanHideCursor () {
    canHideCursorRef.current = true
  }

  function disableCanHideCursor () {
    canHideCursorRef.current = false
  }

  function tryPlayVideo () {
    videoRef.current?.play()
      .then(() => {
        setAutoplayBlocked(false)
        pausedForErrorRef.current = false
        playAfterDragRef.current = true
      })
      .catch((err) => {
        errorHandler(err, 'Error reproduciendo el video', 'dev')
        setAutoplayBlocked(true)
        setIsPlaying(false)
        pausedForErrorRef.current = true
        pausedForDraggingRef.current = false
      })
  }

  function handleVideoEnded () {
    let selectorId = randomSelectorId.current
    const result = getRandomItem(suggestedVideos, selectorId)
    
    const nextVideo = result[0]
    selectorId = result[1]

    navigate(`/watch?v=${nextVideo.id}`)
  }

  function checkPlayerStates () {
    const video = videoRef.current
    if (!video) return

    // Estado de reproducción
    const isPlaying = !video.paused
    setIsPlaying(isPlaying)
  }

  function setInitialVolume () {
    if (initialVolumeSettedRef.current) return
    
    const video = videoRef.current
    if (!video) return

    video.volume = volume
    initialVolumeSettedRef.current = true

    syncVolumeUI()
  }

  useEffect(() => {    
    importDashjs()

    const video = videoRef.current
    if (!video) return

    resetControlsTimeout()
    setPlayer(video)

    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      resetControlsTimeout()
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  useEffect(() => {
    if (!dashjs || !video) return

    createPlayer()
      .then((player) => initPlayer(player))
  }, [dashjs, video])

  useEffect(() => {    
    if (!video) return
    setDuration(video.duration)
    checkPlayerStates()
  }, [video])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    
    showControls()
    
    if (!isPlaying) {
      video.pause()
      return
    }

    tryPlayVideo()
  }, [isPlaying])

  useEffect(() => {
    if (!autoplayBlocked) return

    const handleClick = () => setAutoplayBlocked(true)
    
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [autoplayBlocked])

  return (
    <div
      class={`${className} relative`}
      style={style}
      onMouseMove={handleMouseMove}
    >
      <video
        ref={videoRef}
        class='w-full h-auto cinema:h-full cinema:w-auto aspect-(--aspectRatio) lg:aspect-video'
        style={{ '--aspectRatio': video?.aspect_ratio.replace(':', '/') || '16/9' }}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnded}
        onPlay={checkPlayerStates} // Se supone que es mejor que onPlaying para esto
        onPause={checkPlayerStates}
        onVolumeChange={checkPlayerStates}
      />
      {/* controles */}
      <div class={`${controlsVisible ? '' : 'hide'} absolute left-0 top-0 flex flex-col justify-between h-full w-full [.hide]:opacity-0 transition-opacity`}>
        <section
          class='flex-1 max-h-[calc(100%-68px)] w-full'
          onClick={togglePlayerState}
          onMouseOver={enableCanHideCursor}
          onMouseOut={disableCanHideCursor}
        >
          <h1 class='not-full-screen:hidden'>Almost (nombre video)</h1>
        </section>
        <section
          class='relative bottom-0 w-full h-fit px-2'
          onMouseEnter={handleHoverControls}
          onMouseLeave={handleLeaveControls}
        >
          {/* línea de tiempo */}
          <div
            id='timeline'
            ref={timelineRef}
            class='group absolute bottom-14.5 left-1/2 translate-y-1/2 -translate-x-1/2 flex items-center h-5 w-[calc(100%-24px)] cursor-pointer'
            onMouseDown={handlePressTimeline}
            /* El eventListener del mouseUp se maneja desde un effect */
          >
            <div class='absolute flex items-center h-1 group-hover:h-1.5 w-full cursor-pointer rounded-full transition-all duration-300 bg-gray-900/60' /> {/* track */}
            <div ref={timeseenRef} class='absolute h-1 group-hover:h-1.5 rounded-full transition-[height] duration-300 [background:var(--color-gradient)]' /> {/* tiempo visto */}
            <div ref={timelineThumbRef} class='absolute left-0 top-1/2 -translate-1/2 size-3 group-hover:size-5 rounded-full transition-[height,width] duration-300 [background:var(--color-gradient)] shadow-2xl' /> {/* thumb */}
          </div>
          {/* botones */}
          <div class='flex h-13 justify-between px-1 gap-2'>
            <section class='flex items-center gap-2'>
              <button
                class='group flex items-center justify-center size-10 p-1 rounded-full overflow-hidden cursor-pointer transition-colors bg-black/30 outline-0 border-2 border-transparent focus-within:border-focus'
                onClick={togglePlayerState}
              >
                <div class='flex items-center justify-center size-full rounded-full pointer-events-none transition-colors group-hover:bg-white/10'>
                  { isPlaying
                    ? <Icon class='size-8 shrink-0 filter-[drop-shadow(0px_0px_1px_black)]'>
                        <IconPause />
                      </Icon>
                    : <Icon class='size-10 shrink-0 filter-[drop-shadow(0px_0px_1px_black)]'>
                        <IconPlay />
                      </Icon>
                  }
                </div>
              </button>
              <div class='flex items-center justify-center h-10 w-fit rounded-full bg-black/30'>
                <button class='group flex items-center justify-center h-full w-13 p-1 pr-0 rounded-full overflow-hidden cursor-pointer transition-colors outline-0 border-2 border-transparent focus-within:border-focus'>
                  <div class='flex items-center justify-center size-full rounded-full transition-colors group-hover:bg-white/10'>
                    <Icon class='size-10 shrink-0 filter-[drop-shadow(0px_0px_1px_black)] rotate-180'>
                      <IconNext />
                    </Icon>
                  </div>
                </button>
                <button class='group flex items-center justify-center h-full w-13 p-1 pl-0 rounded-full overflow-hidden cursor-pointer transition-colors outline-0 border-2 border-transparent focus-within:border-focus'>
                  <div class='flex items-center justify-center size-full rounded-full transition-colors group-hover:bg-white/10'>
                    <Icon class='size-10 shrink-0 filter-[drop-shadow(0px_0px_1px_black)]'>
                      <IconNext />
                    </Icon>
                  </div>
                </button>
              </div>
              <div class='group relative flex items-center justify-center h-10 w-fit rounded-full bg-black/30'>
                <div class='absolute w-full h-full left-0 top-0 p-1'>
                  <div class='w-full h-full rounded-full group-hover:bg-white/10' />
                </div>
                <button class='flex items-center justify-center h-full w-10 rounded-full outline-0 border-2 overflow-hidden cursor-pointer transition-colors border-transparent focus-within:border-focus'>
                  <div class='flex items-center justify-center size-8 rounded-full transition-colors'>
                    <Icon class='size-8 shrink-0 filter-[drop-shadow(0px_0px_1px_black)]'>
                      <IconVolume />
                    </Icon>
                  </div>
                </button>
                <button class='h-full w-0 group-hover:w-fit focus-within:w-fit group-hover:pr-5 focus-within:pr-5 overflow-hidden transition-[width] [interpolate-size:allow-keywords] duration-350 group-hover:duration-250 outline-0 border border-transparent focus-within:border-focus'>
                  {/* volumen */}
                  <div
                    id='volume'
                    ref={volumeRef}
                    class='relative w-13 h-full bg-black flex items-center cursor-pointer outline-0 border-2 border-transparent focus-within:border-focus'
                    onMouseDown={handlePressVolme}
                  >
                    <div class='flex items-center h-0.5 w-full rounded-full transition-all duration-300 bg-transparent' /> {/* track */}
                    <div
                      ref={volumeLevelRef}
                      class='absolute w-0 h-0.5 rounded-full [transition:height_300ms_ease] filter-[drop-shadow(0px_0px_1px_black)] bg-white'
                    /> {/* nivel del volumen */}
                    <div
                      ref={volumeThumbRef}
                      class='absolute left-0 top-1/2 -translate-y-1/2 size-3 rounded-full [transition:height_300ms_ease] filter-[drop-shadow(0px_0px_1px_black)] bg-white shadow-2xl'
                    /> {/* thumb */}
                  </div>
                </button>
              </div>
              <div class='flex items-center justify-center h-10 w-fit p-1 rounded-full bg-black/30'>
                <div class='flex items-center justify-center h-full w-full px-3 rounded-full text-sm'>
                  <span>{parseDuration(currentTime)}</span>
                  &nbsp;<span class='text-sm'>/</span>&nbsp;
                  <span>{parseDuration(duration)}</span>
                </div>
              </div>
            </section>
            <section>
              { playerInitialized && video?.resolutions.map(({ id }) => (
                <button
                  key={`player-change-resolution-${id}`}
                  class='p-2 bg-gray-700 cursor-pointer'
                  onClick={handleChangeResolution(id)}
                >
                  {id}
                </button>
              )) }
            </section>
            {/* <div>
              <button>cc</button>
              <button>res</button>
              <button>cfg</button>
              <button>mini</button>
              <button>cine</button>
              <button>fullsc</button>
            </div> */}
          </div>
        </section>
      </div>
    </div>
  )
}
