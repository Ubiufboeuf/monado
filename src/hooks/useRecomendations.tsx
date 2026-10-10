import { ENDPOINTS } from '@/constants/api'
import type { Video } from '@/types/videoTypes'
import { useEffect, useState } from 'preact/hooks'

async function getRecomendations (id: string): Promise<Video[] | undefined> {
  const url = `${ENDPOINTS.RECOMENDATIONS}/${id}`
  const res = await fetch(url)
  const data = await res.json()

  return data
}

export function useRecomendations (id: string) {
  const [recomendations, setRecomendations] = useState<Video[] | undefined>([])

  async function loadRecomendations () {
    const recomendations = await getRecomendations(id)
    setRecomendations(recomendations)
  }
  
  useEffect(() => {
    loadRecomendations()
  }, [])
  
  return recomendations
}
