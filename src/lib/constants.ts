const DEV = import.meta.env.DEV
const SERVER_URL = import.meta.env.PUBLIC_SERVER_URL
const HMR_HOST = import.meta.env.PUBLIC_HMR_HOST
const HMR_PORT = Number(import.meta.env.PUBLIC_HMR_PORT)

export const ENDPOINTS = {
  VIDEOS: `${SERVER_URL}/videos`,
  VIDEO: `${SERVER_URL}/video`,
  STREAMS: `${SERVER_URL}/streams`,
  SEARCH: `${SERVER_URL}/search`
  // THUMBNAIL: `${SERVER_URL}/video/thumbnail`
} as const

export const SERVER_RESPONSE_PARSER_TARGETS = {
  VIDEOS: 'videos',
  SEARCH: 'search'
} as const

export {
  DEV,
  HMR_HOST,
  HMR_PORT
}

export const EMPTY = '(Vacío)' as const
export const AUTO_PLAY = false
export const INITIAL_VOLUME = 1
export const SHOW_PLAYER_POSTER = false
export const VIDEOS_LIMIT_PER_REQUEST = 12
export const DEFAULT_ASPECT_RATIO = '16:9'
export const AUDIO_ONLY_RESOLUTION = '18p'
