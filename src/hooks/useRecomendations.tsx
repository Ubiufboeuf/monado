import { getVideos } from '@/services/videoService'
import type { Video } from '@/types/videoTypes'
import { useEffect, useState } from 'preact/hooks'

export function useRecomendations () {
  const [recomendations, setRecomendations] = useState<Video[]>()  
  const [cursor, setCursor] = useState<string | undefined>()

  function pushRecomendations (current: Video[] | undefined) {
    if (!current?.length) return
    const list = new Set(current)
    for (const video of recomendations ?? []) {
      list.add(video)
    }
    setRecomendations([...list])
  }
  
  async function loadRecomendations () {
    const { videos: recomendations, cursor: next } = await getVideos({ cursor })
    setCursor(next)
    pushRecomendations(recomendations)
  }
  
  useEffect(() => {
    loadRecomendations()
  }, [])

  return recomendations
}

