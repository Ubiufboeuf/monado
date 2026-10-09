import { getManifest } from '@/lib/api'
import { useEffect, useRef } from 'preact/hooks'
import shaka from 'shaka-player/dist/shaka-player.compiled.js'

export function Player () {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const url = new URL(window.location.href)
    const id = url.searchParams.get('v')

    if (!id) return

    shaka.polyfill.installAll()

    const player = new shaka.Player()

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

  return (
    <div class='relative h-full w-full desktop:tv:lg:rounded-xl overflow-hidden bg-black'>
    <video
      ref={videoRef}
      controls
      class='absolute h-full w-full aspect-video bg-black'
      />
    </div>
  )
}
