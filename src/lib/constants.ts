const DEV = import.meta.env.DEV
const SERVER_URL = import.meta.env.PUBLIC_SERVER_URL
const HMR_HOST = import.meta.env.PUBLIC_HMR_HOST
const HMR_PORT = Number(import.meta.env.PUBLIC_HMR_PORT)
const BASE_URL = import.meta.env.PUBLIC_BASE_URL

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
  HMR_PORT,
  BASE_URL
}

export const EMPTY = '(Vacío)' as const
export const VIDEOS_LIMIT_PER_REQUEST = 12
export const AUTO_PLAY = false
export const TIME_TO_HIDE_CONTROLS = 3 * 1000
