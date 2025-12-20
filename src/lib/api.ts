import { ENDPOINTS } from './constants'

export function getThumbnail (videoId: string | undefined, thumbnailId: string | undefined) {
  if (!videoId || !thumbnailId) return
  return `${ENDPOINTS.VIDEO}/${videoId}/thumbnail/${thumbnailId}`
}

export function getPoster (videoId: string | undefined) {
  if (!videoId) return
  return `${ENDPOINTS.VIDEO}/${videoId}/poster`
}
