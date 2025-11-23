import type { Thumbnail, VideoFormat } from '@/types/videoTypes'

export interface ServerResponse {
  success: boolean
  status: number
  msg?: string
  cause?: string
  [key: string]: unknown
}

export interface VideoFromServer {
  id?: string
  title?: string
  description?: string
  channel_id?: string
  channel_url?: string
  duration?: number
  view_count?: number
  webpage_url?: string
  categories?: string[]
  tags?: string[]
  like_count?: number
  is_live?: boolean
  was_live?: boolean
  release_datestring?: string
  availability?: string
  uploader?: string
  uploader_id?: `@${string}`
  uploader_url?: `${string}@${string}`
  language?: string
  thumbnails?: Thumbnail[]
  thumbnail?: string
  minimalThumbnail: string
  formats?: VideoFormat[]
  release_timestamp?: number
}
