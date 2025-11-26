const DEV = import.meta.env.DEV
const SERVER_URL = import.meta.env.PUBLIC_SERVER_URL

export const ENDPOINTS = {
  VIDEOS: `${SERVER_URL}/data/videos?range=0_2`,
  THUMBNAIL: `${SERVER_URL}/poster/`
} as const

export {
  DEV
}
