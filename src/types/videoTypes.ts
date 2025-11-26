export interface Video {
  id: string
  title: string
  duration: number
  views: number
  likes: number
  assets: VideoAssets
  formats: VideoFormat[]
  source: string
  release_timestamp: number
}

export interface VideoAssets {
  thumbnails: Thumbnail[]
  thumbnail: string
  minThumbnail: string
}

export interface Thumbnail {
  id: string
  height: number
  width: number
  resolution: `${number}x${number}`
  url: string | null
}

export interface VideoFormat {
  duration?: number
  ext?: string
  type?: 'audio' | 'video'
  resolution?: string
  aspect_ratio?: number
  height?: number
  width?: number
}
