import { useEffect, useRef, useState } from 'preact/hooks'

export function useMediaCheck (query: string, sub = true): [boolean, () => void] {
  const [mq, setMQ] = useState(false)
  const mediaQueryRef = useRef<MediaQueryList>()

  const handleMQChange = (ev: MediaQueryListEvent) => setMQ(ev.matches)
  const unsub = () => mediaQueryRef.current?.removeEventListener('change', handleMQChange)
  
  useEffect(() => {
    const mediaQuery = window.matchMedia(query)

    setMQ(mediaQuery.matches)
    mediaQueryRef.current = mediaQuery

    if (sub) mediaQuery.addEventListener('change', handleMQChange)

    return unsub
  }, [query])
  
  return [mq, unsub]
}
