import type { VideoFromServer } from '@/services/apiTypes'

/* eslint-disable @typescript-eslint/no-explicit-any */
export function isValidVideo (data: any): data is VideoFromServer {
  if (typeof data !== 'object' || data === null) return false

  // chequear campos realmente esenciales
  const hasId = typeof data.id === 'string' && data.id.length > 0
  const hasTitle = typeof data.title === 'string'
  const hasDuration = typeof data.duration === 'number' && data.duration >= 0

  // videos debe ser un array, aunque esté vacío
  const hasVideos = Array.isArray(data.videos)

  // thumbnails igual, debería ser un array, aunque esté vacío
  const hasThumbnails = Array.isArray(data.thumbnails)

  return hasId && hasTitle && hasDuration && hasVideos && hasThumbnails
}
