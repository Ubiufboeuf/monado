import type { RefObject } from 'preact'
import { useEffect } from 'preact/hooks'

export function useIntersectionObserver (ref: RefObject<Element>, callback: () => void, options: IntersectionObserverInit) {
  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && callback(),
      options
    )

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [ref, callback, options])
}
