import { getManifest } from '@/lib/api'
import { useEffect, useRef, useState } from 'preact/hooks'
import shaka from 'shaka-player/dist/shaka-player.compiled.js'
import { Keybinds } from '../Keybinds'
import { backwardSeconds, backwardTime, forwardSeconds, forwardTime, moveToVideoFraction, toggleCinemaMode, toggleFullScreen, togglePlayState } from '@/lib/player/playerActions'
import { usePlayerStore } from '@/stores/usePlayerStore'
import { Controls } from './Controls'
import { useMetadata } from '@/hooks/useMetadata'

export function Player () {
  const videoRef = useRef<HTMLVideoElement>(null)
  const metadata = usePlayerStore((state) => state.metadata)
  const setElement = usePlayerStore((state) => state.setElement)
  const setDuration = usePlayerStore((state) => state.setDuration)
  const setCurrentTime = usePlayerStore((state) => state.setCurrentTime)
  const setPlayer = usePlayerStore((state) => state.setPlayer)

  const [id, setId] = useState<string>()

  useMetadata(id)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    setElement(video)

    const url = new URL(window.location.href)
    const id = url.searchParams.get('v')

    if (!id) return
    setId(id)

    shaka.polyfill.installAll()

    const player = new shaka.Player()
    setPlayer(player)

    async function init () {
      if (!shaka.Player.isBrowserSupported()) {
        console.error('Navegador no compatible')
        return
      }

      await player.attach(video!)
      await player.load(getManifest(id!))
    }

    init().catch(console.error)

    return () => {
      void player.destroy()
    }
  }, [])

  useEffect(() => {
    if (!metadata) return

    const title = metadata.title ?? 'unknown_title'
    const artist = metadata.creator.name ?? 'unknown_artist'
    const src = metadata.thumbnail ?? 'unknown_thumbnail'

    navigator.mediaSession.metadata = new MediaMetadata({
      title,
      artist,
      artwork: [
        {
          src,
          sizes: '512x512',
          type: 'image/jpeg'
        }
      ]
    })
  }, [metadata])

  return (
    <div class='relative h-full w-full desktop:tv:lg:rounded-xl overflow-hidden bg-black'>
      <video
        ref={videoRef}
        class='absolute h-full w-full aspect-video bg-black'
        onDurationChange={() => setDuration(videoRef.current?.duration)}
        onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime)}
      />
      <Controls />
      
      <Keybinds keys='t' onBind={toggleCinemaMode} hidden />
      <Keybinds keys='space' onBind={togglePlayState} hidden />
      <Keybinds keys='f' onBind={toggleFullScreen} hidden />
      <Keybinds keys='j' onBind={backwardSeconds(10)} hidden />
      <Keybinds keys='k' onBind={togglePlayState} hidden />
      <Keybinds keys='l' onBind={forwardSeconds(10)} hidden />
      <Keybinds keys='arrowleft' onBind={backwardTime} hidden />
      <Keybinds keys='arrowright' onBind={forwardTime} hidden />

      <Keybinds keys='1' onBind={moveToVideoFraction(1)} hidden />
      <Keybinds keys='2' onBind={moveToVideoFraction(2)} hidden />
      <Keybinds keys='3' onBind={moveToVideoFraction(3)} hidden />
      <Keybinds keys='4' onBind={moveToVideoFraction(4)} hidden />
      <Keybinds keys='5' onBind={moveToVideoFraction(5)} hidden />
      <Keybinds keys='6' onBind={moveToVideoFraction(6)} hidden />
      <Keybinds keys='7' onBind={moveToVideoFraction(7)} hidden />
      <Keybinds keys='8' onBind={moveToVideoFraction(8)} hidden />
      <Keybinds keys='9' onBind={moveToVideoFraction(9)} hidden />
      <Keybinds keys='0' onBind={moveToVideoFraction(0)} hidden />
    </div>
  )
}
