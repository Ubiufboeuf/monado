import { useEffect, useRef, useState } from 'preact/hooks'

export function useMediaCheck (query: string, sub = true): [boolean, () => void] {
  const match = (query: string) => window.matchMedia(query)

  const [mq, setMQ] = useState(match(query).matches)
  const mediaQueryRef = useRef<MediaQueryList>()

  const handleMQChange = (ev: MediaQueryListEvent) => setMQ(ev.matches)
  const unsub = () => mediaQueryRef.current?.removeEventListener('change', handleMQChange)
  
  useEffect(() => {
    const mediaQuery = match(query)

    setMQ(mediaQuery.matches)
    mediaQueryRef.current = mediaQuery

    if (sub) mediaQuery.addEventListener('change', handleMQChange)

    return unsub
  }, [query])

  return [mq, unsub]
}
