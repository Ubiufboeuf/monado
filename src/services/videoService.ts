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

export async function getVideo (id: string): Promise<Video | undefined> {
  let res
  try {
    res = await fetch(`${ENDPOINTS.VIDEO}?id=${id}`)
  } catch (err) {
    const errorMessage = 'Error con la petición de la información del video'
    errorHandler(err, errorMessage, 'dev')
    throw new Error(errorMessage)
  }

  let data: unknown = undefined
  try {
    data = await responseHandler(res)
  } catch (err) {
    const errorMessage = 'Error parseando la respuesta de la información'
    errorHandler(err, errorMessage, 'dev')
    throw new Error(errorMessage)
  }

  let video: Video | undefined
  try {
    video = formVideo(data as ServerResponse)
  } catch (err) {
    const errorMessage = 'Error formando los videos'
    errorHandler(err, errorMessage, 'dev')
    throw new Error(errorMessage)
  }
  
  return video
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
      source: `${ENDPOINTS.VIDEO_STREAM}/${v.id}/manifest.mpd`,
      release_timestamp: v.release_timestamp || -1
    }

    videos.push(video)
  }
  
  return videos
}

export function formVideo (data: ServerResponse) {
  const videoFromServer = data.video

  if (!videoFromServer) {
    throw new Error('La variable de los datos del video es falsy')
  }
  
  if (!isValidVideo(videoFromServer) || !videoFromServer.id) return

  const assets: VideoAssets = {
    minThumbnail: `${ENDPOINTS.THUMBNAIL}/${videoFromServer.minimalThumbnail}`,
    thumbnail: `${ENDPOINTS.THUMBNAIL}/${videoFromServer.thumbnail}`,
    thumbnails: videoFromServer.thumbnails?.map((t) => ({
      ...t,
      url: `${ENDPOINTS.THUMBNAIL}/${t.url}`
    })) || []
  }
  
  const video: Video = {
    id: videoFromServer.id,
    assets,
    title: videoFromServer.title || 'Título',
    duration: videoFromServer.duration || -1,
    views: videoFromServer.view_count || -1,
    likes: videoFromServer.like_count || -1,
    formats: videoFromServer.formats || [],
    source: `${ENDPOINTS.VIDEO_STREAM}/${videoFromServer.id}/manifest.mpd`,
    release_timestamp: videoFromServer.release_timestamp || -1
  }
  
  return video
}
