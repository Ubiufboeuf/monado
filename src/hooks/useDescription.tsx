import { getCurrentVideoId, getVideoDescription } from '@/services/videoService'
import type { VideoDescription } from '@/types/videoTypes'
import { useEffect, useState } from 'preact/hooks'

export function useDescription () {
  const [description, setDescription] = useState<VideoDescription>()  

  async function loadVideoDescription () {
    const id = getCurrentVideoId()
    if (!id) return

    const description = await getVideoDescription(id)
    setDescription(description)
  }
  
  useEffect(() => {
    loadVideoDescription()
  }, [])

  return description
}

