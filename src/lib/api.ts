import { ENDPOINTS } from './constants'

export function getThumbnail (videoId: string, thumbnailId: string) {
  return `${ENDPOINTS.VIDEO}/${videoId}/thumbnail/${thumbnailId}`
}
