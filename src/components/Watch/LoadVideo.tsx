import { getCurrentVideoId, getVideo } from '@/services/videoService'
import { usePlayerStore } from '@/stores/usePlayerStore'
import { useEffect } from 'preact/hooks'

export function LoadVideo () {
  const setVideo = usePlayerStore((state) => state.setVideo)
  
  async function loadVideo (id: string) {
    const video = await getVideo(id)
    setVideo(video)
  }
  
  useEffect(() => {
    const id = getCurrentVideoId()
    if (!id) {
      location.href = '/'
      return
    }

    loadVideo(id)
  }, [])
}
