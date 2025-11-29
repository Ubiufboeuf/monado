/* eslint-disable @typescript-eslint/consistent-type-imports */
import { errorHandler } from '@/lib/errors'
import { usePlayerStore } from '@/stores/usePlayerStore'
import type { MediaPlayerClass, MediaPlayerSettingClass } from 'dashjs'
import type { CSSProperties } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'
import { Icon } from '../Icon'
import { IconNext, IconPause, IconPlay } from '../Icons'
import { parseDuration } from '@/lib/parsers'

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

let isMouseDown = false
let pausedForDragging = false
let pausedForError = false
let playAfterDrag = true

export function Player ({ class: className, style }: { class?: string, style?: CSSProperties }) {
  type DashJS = typeof import('/home/mango/Dev/monado/node_modules/dashjs/index')

  const [dashjs, setDashjs] = useState<DashJS>()
  const [playerInitialized, setPlayerInitialized] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [autoplayBlocked, setAutoplayBlocked] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  
  const playerRef = useRef<MediaPlayerClass>()
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const timelineRef = useRef<HTMLDivElement | null>(null)
  const timeseenRef = useRef<HTMLDivElement | null>(null)
  const timelineThumbRef = useRef<HTMLDivElement | null>(null)

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
    // ↓ este autoPlay no define el autoPlay del reproductor, simplemente es una configuración que pide dash.js
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

  function handlePressTimeline (event: MouseEvent) {
    // console.log('press', isMouseDown && 'mouse down')
    // if (isMouseDown) return
    isMouseDown = true
    
    if (!pausedForError) {
      pause()
      pausedForDragging = true
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
    if (!isMouseDown) return
    
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

  function handleMouseUp () {
    // console.log('mouse up')
    isMouseDown = false

    if (pausedForDragging && playAfterDrag) {
      play()
      pausedForDragging = false
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
    playAfterDrag = false
    return isPlaying ? pause() : play()
  }

  useEffect(() => {    
    importDashjs()

    const video = videoRef.current
    if (!video) return

    setPlayer(video)

    window.addEventListener('mouseup', handleMouseUp)

    return () => {
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
  }, [video])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    
    if (!isPlaying) {
      video.pause()
      return
    }

    video.play()
      .then(() => {
        // console.log('playing')
        setAutoplayBlocked(false)
        pausedForError = false
        playAfterDrag = true
      })
      .catch((err) => {
        errorHandler(err, 'Error reproduciendo el video', 'dev')
        setAutoplayBlocked(true)
        setIsPlaying(false)
        pausedForError = true
        pausedForDragging = false
      })
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
    >
      <video
        ref={videoRef}
        class='w-full max-h-[calc(100cqw*9/16)] lg:max-h-auto lg:h-full'
        onTimeUpdate={handleTimeUpdate}
      />
      {/* controles */}
      <div class='absolute left-0 top-0 h-full w-full'>
        <h1 class='not-full-screen:hidden'>Almost (nombre video)</h1>
        <section class='absolute bottom-0 w-full h-fit px-2'>
          {/* línea de tiempo */}
          <div
            ref={timelineRef}
            class='group relative flex items-center h-2.5 w-[calc(100%-8px)] mx-auto cursor-pointer'
            onMouseDown={handlePressTimeline}
            /* El eventListener del mouseUp se maneja desde un effect */
          >
            <div class='absolute flex items-center h-1 group-hover:h-1.5 w-full cursor-pointer rounded-full transition-all duration-300 bg-gray-900/60' /> {/* track */}
            <div ref={timeseenRef} class='absolute h-1 group-hover:h-1.5 rounded-full transition-all duration-300 [background:var(--color-gradient)]' /> {/* tiempo visto */}
            <div ref={timelineThumbRef} class='absolute left-0 top-1/2 -translate-1/2 size-3 group-hover:size-5 transition-all duration-300 rounded-full [background:var(--color-gradient)] shadow-2xl' /> {/* thumb */}
          </div>
          {/* botones */}
          <div class='flex h-13 justify-between px-1'>
            <section class='flex items-center gap-2'>
              <button
                class='group flex items-center justify-center size-10 p-1 rounded-full overflow-hidden cursor-pointer transition-colors bg-black/30'
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
                <button class='group flex items-center justify-center h-full w-13 p-1 pr-0 rounded-full overflow-hidden cursor-pointer transition-colors'>
                  <div class='flex items-center justify-center size-full rounded-full transition-colors group-hover:bg-white/10'>
                    <Icon class='size-10 shrink-0 filter-[drop-shadow(0px_0px_1px_black)] rotate-180'>
                      <IconNext />
                    </Icon>
                  </div>
                </button>
                <button class='group flex items-center justify-center h-full w-13 p-1 pl-0 rounded-full overflow-hidden cursor-pointer transition-colors'>
                  <div class='flex items-center justify-center size-full rounded-full transition-colors group-hover:bg-white/10'>
                    <Icon class='size-10 shrink-0 filter-[drop-shadow(0px_0px_1px_black)]'>
                      <IconNext />
                    </Icon>
                  </div>
                </button>
              </div>
              {/* <div class='flex items-center justify-center h-10 w-fit rounded-full bg-black/30'>
                volumen
              </div> */}
              <div class='flex items-center justify-center h-10 w-fit p-1 rounded-full bg-black/30'>
                <div class='flex items-center justify-center h-full w-full px-3 rounded-full text-sm'>
                  <span>{parseDuration(currentTime)}</span>
                  &nbsp;<span class='text-sm'>/</span>&nbsp;
                  <span>{parseDuration(duration)}</span>
                </div>
              </div>
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
