import { ENDPOINTS } from '@/lib/constants'
import { errorHandler } from '@/lib/errors'
import { responseHandler } from '@/lib/handlers'
import type { Video, VideoAssets } from '@/types/videoTypes'
import type { ServerResponse } from './apiTypes'
import { isValidVideo } from '@/lib/validations'

export async function getVideos (): Promise<Video[]> {
  let res
  try {
    res = await fetch(ENDPOINTS.VIDEOS)
  } catch (err) {
    const errorMessage = 'Error con la petición de los videos'
    errorHandler(err, errorMessage, 'dev')
    throw new Error(errorMessage)
  }

  let data: unknown = undefined
  try {
    data = await responseHandler(res)
  } catch (err) {
    const errorMessage = 'Error parseando la respuesta'
    errorHandler(err, errorMessage, 'dev')
    throw new Error(errorMessage)
  }

  let videos = []
  try {
    videos = formVideos(data as ServerResponse)
  } catch (err) {
    const errorMessage = 'Error formando los videos'
    errorHandler(err, errorMessage, 'dev')
    throw new Error(errorMessage)
  }
  
  return videos
}

export function formVideos (data: ServerResponse): Video[] {
  if (!data) return []
  
  const videosFromServer = data.videos
  
  if (!videosFromServer || !Array.isArray(videosFromServer)) {
    throw new Error('La variable de videos es falsy o no es un array')
  }

  const videos: Video[] = []

  for (const v of videosFromServer) {
    if (!isValidVideo(v) || !v.id) continue

    const assets: VideoAssets = {
      minThumbnail: `${ENDPOINTS.THUMBNAIL}/${v.minimalThumbnail}`,
      thumbnail: `${ENDPOINTS.THUMBNAIL}/${v.thumbnail}`,
      thumbnails: v.thumbnails?.map((t) => ({
        ...t,
        url: `${ENDPOINTS.THUMBNAIL}/${t.url}`
      })) || []
    }
    
    const video: Video = {
      id: v.id,
      assets,
      title: v.title || 'Título',
      duration: v.duration || -1,
      views: v.view_count || -1,
      likes: v.like_count || -1,
      formats: v.formats || [],
      release_timestamp: v.release_timestamp || -1
    }

    videos.push(video)
  }
  
  return videos
}
