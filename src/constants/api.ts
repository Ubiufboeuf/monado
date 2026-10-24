import { API_URL } from './env'

export const ENDPOINTS = {
  STREAMS: `${API_URL}/video`,
  RECOMENDATIONS: `${API_URL}/recomendations`,
  METADATA: `${API_URL}/video/info`
} as const
