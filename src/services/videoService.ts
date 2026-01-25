import { EMPTY, ENDPOINTS } from '@/lib/constants'
import { errorHandler } from '@/lib/errors'
import { responseHandler } from '@/lib/handlers'
import type { ResolutionsById, Thumbnail, ThumbnailsById, Video } from '@/types/videoTypes'
import type { ServerResponse, VideoFromServer } from '../types/serverTypes'
import { isValidVideo } from '@/lib/validations'
import { getMax, getMin } from '@/lib/utils'
import { parseServerResponse } from './serverService'

interface GetVideosArgs {
  limit?: number
  cursor?: string
}

export async function getVideos (
  { limit = 12, cursor = undefined }: GetVideosArgs = {}):
  Promise<{ videos: Video[], cursor: string | undefined }>
{
  let res
  try {
    res = await fetch(`${ENDPOINTS.VIDEOS}?limit=${limit}&cursor=${cursor}`)
  } catch (err) {
    const errorMessage = 'Error con la petición de los videos'
    errorHandler(err, errorMessage, 'dev')
    throw new Error(errorMessage)
  }

  let serverResponse: unknown = undefined
  try {
    serverResponse = await responseHandler(res)
  } catch (err) {
    const errorMessage = 'Error parseando la respuesta'
    errorHandler(err, errorMessage, 'dev')
    throw new Error(errorMessage)
  }

  let newCursor
  if (typeof serverResponse === 'object' && serverResponse && 'nextCursor' in serverResponse) {
    newCursor = serverResponse.nextCursor as string
  }

  const data = parseServerResponse('videos', serverResponse)
  if (!data) return { videos: [], cursor: undefined }
  
  let videos = []
  try {
    videos = formVideos(data?.videos)
  } catch (err) {
    const errorMessage = 'Error formando los videos'
    errorHandler(err, errorMessage, 'dev')
    throw new Error(errorMessage)
  }
  
  return { videos, cursor: newCursor }
}

export async function getVideo (id: string): Promise<Video | undefined> {
  let res
  try {
    res = await fetch(`${ENDPOINTS.VIDEO}/${id}`)
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

export function formVideos (videosFromServer: VideoFromServer[] | undefined): Video[] {
  if (!videosFromServer) return []
  
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

  const thumbnails: Thumbnail[] = []

  for (const idx in v.thumbnails) {
    const t = v.thumbnails[idx]
    // const url = `${ENDPOINTS.THUMBNAIL}/${v.id}/${t.id}`
    const url = getThumbnail(v.id, t.id)
    if (url) thumbnails.push({ ...t, url })
  }
  
  const thumbnailsById: ThumbnailsById = {}

  for (const t of thumbnails) {
    thumbnailsById[t.id] = t 
  }
  
  return {
    id: v.id,
    source: `${ENDPOINTS.STREAMS}/${v.id}/manifest.mpd`,
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
    thumbnails,
    thumbnailsById,
    min_thumbnail: v.min_thumbnail ?? '',
    max_thumbnail: v.max_thumbnail ?? '',
    release_timestamp: v.timestamp ?? -1
  }
}

export function getThumbnail (videoId: string | undefined, thumbnailId: string | undefined) {
  if (!videoId || !thumbnailId) return
  return `${ENDPOINTS.VIDEO}/${videoId}/thumbnail/${thumbnailId}`
}

export function getPoster (videoId: string | undefined) {
  if (!videoId) return
  return `${ENDPOINTS.VIDEO}/${videoId}/poster`
}
