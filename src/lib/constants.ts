const DEV = import.meta.env.DEV
const SERVER_URL = import.meta.env.PUBLIC_SERVER_URL

export const ENDPOINTS = {
  VIDEOS: `${SERVER_URL}/videos`,
  VIDEO: `${SERVER_URL}/video`,
  STREAMS: `${SERVER_URL}/streams`
  // THUMBNAIL: `${SERVER_URL}/video/thumbnail`
} as const

export const SERVER_RESPONSE_PARSER_TARGETS = {
  VIDEOS: 'videos'
} as const

export {
  DEV
}

export const EMPTY = '(Vacío)' as const
export const AUTO_PLAY = false
export const INITIAL_VOLUME = 1
export const SHOW_PLAYER_POSTER = false
