import { DEFAULT_DOUBLE_TAP_DELAY } from '@/constants/player'
import type { TargetedEvent } from 'preact'
import { useRef } from 'preact/hooks'

type TapFunction = ((event: TargetedEvent<HTMLElement>) => void) | undefined

export function useDoubleTap (callback: TapFunction, fallback: TapFunction, delay = DEFAULT_DOUBLE_TAP_DELAY) {
  const lastTapRef = useRef(0)

  if (delay <= 0) {
    throw new Error('El delay del doble-tap debe ser superior a 0ms')
  }
  
  return (event: TargetedEvent<HTMLElement>) => {
    event.stopPropagation()

    const now = Date.now()
    const timeSinceLastTap = now - lastTapRef.current
    lastTapRef.current = now

    const isDoubleTap = timeSinceLastTap < delay

    if (isDoubleTap) {
      callback?.(event)
      return
    }

    fallback?.(event)
  }
}
