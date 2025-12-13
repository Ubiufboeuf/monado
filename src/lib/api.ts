import { ENDPOINTS } from './constants'

export function getThumbnail (videoId: string | undefined, thumbnailId: string | undefined) {
  if (!videoId || !thumbnailId) return
  return `${ENDPOINTS.VIDEO}/${videoId}/thumbnail/${thumbnailId}`
}
