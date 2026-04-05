import type { TargetedEvent } from 'preact'
import { useRef } from 'preact/hooks'

export function useDoubleTap (callback: (event: TargetedEvent) => void, delay = 300) {
  const lastClickRef = useRef(0)

  return (event: TargetedEvent) => {
    // Evitamos comportamientos extraños del navegador
    const now = Date.now()
    const timeSinceLastClick = now - lastClickRef.current

    if (timeSinceLastClick > 0 && timeSinceLastClick < delay) {
      // Es un doble click (o triple, o cuádruple...)
      callback(event)
    }
    
    // Guardamos el momento de este click para el siguiente
    lastClickRef.current = now
  }
}
