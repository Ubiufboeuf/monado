import { ENDPOINTS } from '@/constants/api'
import { usePlayerStore } from '@/stores/usePlayerStore'
import type { Video } from '@/types/videoTypes'
import { useEffect } from 'preact/hooks'

async function getMetadata (id: string): Promise<Video | undefined> {
  const url = `${ENDPOINTS.METADATA}/${id}`
  const res = await fetch(url)
  const data = await res.json()

  return data.video
}

export function useMetadata (id: string | undefined) {
  const metadata = usePlayerStore((state) => state.metadata)
  const setMetadata = usePlayerStore((state) => state.setMetadata)

  async function loadMetadata () {
    if (!id) return
    const metadata = await getMetadata(id)
    setMetadata(metadata)
  }
  
  useEffect(() => {
    loadMetadata()
  }, [id])
  
  return metadata
}
