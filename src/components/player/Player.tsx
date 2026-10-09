import { useEffect, useRef } from 'preact/hooks'
import shaka from 'shaka-player/dist/shaka-player.compiled.js'

export function Player () {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    shaka.polyfill.installAll()

    const player = new shaka.Player()

    async function init () {
      if (!shaka.Player.isBrowserSupported()) {
        console.error('Navegador no compatible')
        return
      }

      await player.attach(video!)
      await player.load('http://localhost:7002/video/798etN3reyk/manifest.mpd')
    }

    init().catch(console.error)

    return () => {
      void player.destroy()
    }
  }, [])

  return (
    <video
      ref={videoRef}
      controls
      class='w-full aspect-video'
    />
  )
}
