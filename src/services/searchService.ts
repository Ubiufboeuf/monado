import { ENDPOINTS } from '@/lib/constants'
import { errorHandler } from '@/lib/errors'
import { responseHandler } from '@/lib/handlers'
import { parseServerResponse } from './serverService'
import { formVideos } from './videoService'

export async function search (query: string) {
  const res = await fetch(`${ENDPOINTS.SEARCH}/${query}`)

  let serverResponse: unknown = undefined
  try {
    serverResponse = await responseHandler(res)
  } catch (err) {
    const errorMessage = 'Error parseando la respuesta'
    errorHandler(err, errorMessage, 'dev')
    throw new Error(errorMessage)
  }

  const results = parseServerResponse('search', serverResponse)?.results
  if (!results) return []
  
  let videos = []
  try {
    videos = formVideos(results)
  } catch (err) {
    const errorMessage = 'Error formando los videos'
    errorHandler(err, errorMessage, 'dev')
    throw new Error(errorMessage)
  }
  
  return videos
}
