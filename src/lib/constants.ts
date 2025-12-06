const DEV = import.meta.env.DEV
const SERVER_URL = import.meta.env.PUBLIC_SERVER_URL

export const ENDPOINTS = {
  VIDEOS: `${SERVER_URL}/data/videos?range=0_20`,
  VIDEO: `${SERVER_URL}/data/video`,
  VIDEO_STREAM: `${SERVER_URL}/video`,
  THUMBNAIL: `${SERVER_URL}/poster`
} as const

export {
  DEV
}

export const EMPTY = '(Vacío)' as const
