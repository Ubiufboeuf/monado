import type { VideoFromServer } from '@/services/apiTypes'

/* eslint-disable @typescript-eslint/no-explicit-any */
export function isValidVideo (data: any): data is VideoFromServer {  
  return Boolean(
    data.id &&
    data.title &&
    data.duration &&
    data.view_count &&
    data.like_count &&
    data.formats &&
    // data.release_timestamp &&
    data.minimalThumbnail &&
    data.thumbnail &&
    data.thumbnails
  )
}
