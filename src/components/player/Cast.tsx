
import { useEffect, useRef, useState } from 'preact/hooks'
import { Button } from './mobile/Button'
import { IconCast } from '../ui/Icons'
import { getManifest } from '@/lib/api'

interface CastInstance {
  available: () => boolean
  connected: () => boolean
  cast: (url: string, metadata?: {
    title?: string
    poster?: string
    time?: number
  }) => Promise<void>
  disconnect: () => void
  on: (event: string, callback: () => void) => void
}

declare const Castjs: new () => CastInstance

interface Props {
  title?: string
  poster?: string
}

let castjsPromise: Promise<void> | null = null

function loadCastjs (): Promise<void> {
  if (typeof Castjs !== 'undefined') return Promise.resolve()
  if (castjsPromise) return castjsPromise

  castjsPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')

    script.src = 'https://cdn.jsdelivr.net/gh/castjs/castjs@v7.0.0/cast.min.js'
    script.async = true

    script.onload = () => {
      if (typeof Castjs !== 'undefined') resolve()
      else reject(new Error('Castjs no está disponible'))
    }

    script.onerror = () => {
      reject(new Error('No se pudo descargar Castjs'))
    }

    document.head.appendChild(script)
  }).catch((error) => {
    castjsPromise = null
    throw error
  })

  return castjsPromise
}

export function CastButton ({ title, poster }: Props) {
  const castRef = useRef<CastInstance | null>(null)
  const [, setAvailable] = useState(false)
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    let mounted = true

    async function initialize () {
      try {
        await loadCastjs()
        if (!mounted) return

        const cast = new Castjs()
        castRef.current = cast

        setAvailable(cast.available())
        setConnected(cast.connected())

        cast.on('available', () => {
          if (!mounted) return
          setAvailable(true)
        })

        cast.on('connect', () => {
          if (!mounted) return
          setConnected(true)
        })

        cast.on('disconnect', () => {
          if (!mounted) return
          setConnected(false)
        })

        cast.on('error', () => {
          if (!mounted) return
          console.error('Ocurrió un error con Google Cast')
        })
      } catch (error) {
        console.error(error)

        if (mounted) {
          console.error('No se pudo inicializar Castjs')
        }
      }
    }

    initialize()

    return () => {
      mounted = false
      castRef.current = null
    }
  }, [])

  async function handleCast () {
    const cast = castRef.current

    if (!cast) {
      console.warn('Castjs todavía no está inicializado')
      return
    }

    if (cast.connected()) {
      cast.disconnect()
      return
    }

    if (!cast.available()) {
      console.log('No hay dispositivos Cast disponibles')
      return
    }

    const id = new URL(location.href).searchParams.get('v')
    const manifestUrl = getManifest(id!)

    const posterUrl = poster
      ? new URL(poster, window.location.href).href
      : undefined
    
    try {
      await cast.cast(manifestUrl, { title, poster: posterUrl })
    } catch (error) {
      console.error(error)
      console.error('No se pudo iniciar la transmisión')
    }
  }

  return  <Button class='static size-10' icon={() => <IconCast active={connected} />} iconClass='size-6' onClick={handleCast} />
}
