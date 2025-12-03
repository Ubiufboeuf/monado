import { EMPTY, ENDPOINTS } from '@/lib/constants'
import { errorHandler } from '@/lib/errors'
import { responseHandler } from '@/lib/handlers'
import type { ResolutionsById, Video } from '@/types/videoTypes'
import type { ServerResponse, VideoFromServer } from './apiTypes'
import { isValidVideo } from '@/lib/validations'
import { getMax, getMin } from '@/lib/utils'

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
    if (!isValidVideo(v)) continue

    const video = parseVideoFromServer(v)
    if (!video) continue

    videos.push(video)
  }

  return videos
}

export function formVideo (data: ServerResponse) {
  const videoFromServer = data.video

  if (!videoFromServer) {
    throw new Error('La variable de los datos del video es falsy')
  }
  
  if (!isValidVideo(videoFromServer)) return
  
  const video = parseVideoFromServer(videoFromServer)
  if (!video) return

  return video
}

function parseVideoFromServer (v: VideoFromServer): Video | undefined {
  if (!v.id) return

  const resolutionsById: ResolutionsById = {}

  for (const res of v.videos) {
    resolutionsById[res.id] = res
  }

  const min_resolution = getMin(v.videos, 'last').id
  const max_resolution = getMax(v.videos, 'last').id
  
  return {
    id: v.id,
    source: `${ENDPOINTS.VIDEO_STREAM}/${v.id}/manifest.mpd`,
    title: v.title ?? EMPTY,
    uploader: v.uploader ?? EMPTY,
    uploader_id: v.uploader_id ?? EMPTY,
    channel_follower_count: v.channel_follower_count ?? 0,
    channel_is_verified: v.channel_is_verified ?? false,
    duration: v.duration ?? 0,
    width: v.width ?? -1,
    height: v.height ?? -1,
    mixed_size: v.mixed_size ?? -1,
    aspect_ratio: v.aspect_ratio ?? '-1:-1',
    audios: [v.audio],
    resolutions: v.videos,
    resolutionsById,
    min_resolution,
    max_resolution,
    thumbnails: v.thumbnails,
    min_thumbnail: v.min_thumbnail ?? '',
    max_thumbnail: v.max_thumbnail ?? '',
    release_timestamp: v.release_timestamp ?? -10
  }
}
