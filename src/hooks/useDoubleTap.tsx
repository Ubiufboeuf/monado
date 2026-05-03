import { DEFAULT_DOUBLE_TAP_DELAY } from '@/lib/constants'
import { showControlsAndScheduleHide } from '@/lib/playerActions'
import type { TargetedEvent } from 'preact'
import { useRef } from 'preact/hooks'

type TapFunction = ((event: TargetedEvent<HTMLElement>) => void) | undefined

export function useDoubleTap (callback: TapFunction, fallback: TapFunction, delay = DEFAULT_DOUBLE_TAP_DELAY) {
  const lastTapRef = useRef(0)

  if (delay <= 0) {
    throw new Error('El delay debe ser superior a 0')
  }
  
  return (event: TargetedEvent<HTMLElement>) => {
    // console.log('- tapFunction -')
    event.stopPropagation()

    const now = Date.now()
    const timeSinceLastTap = now - lastTapRef.current
    lastTapRef.current = now
    // console.log(timeSinceLastTap)

    const isDoubleTap = timeSinceLastTap < delay

    if (isDoubleTap) {
      // console.log('Doble')
      showControlsAndScheduleHide()
      callback?.(event)
    } else {
      // console.log('Simple')
      fallback?.(event)
    }
  }  
}
