import { isValidVideo } from '@/lib/validations'
import type { SearchResults, ServerResponse, ServerResponseParserTarget, VideoFromServer } from '@/types/serverTypes'

export function parseServerResponse (target: ServerResponseParserTarget, serverResponse: unknown): ServerResponse | null {
  // - Comprobación base -
  if (
    typeof serverResponse !== 'object' ||
    serverResponse === null ||
    !('success' in serverResponse && typeof serverResponse.success === 'boolean')
  ) return null

  const success = serverResponse.success

  // - Comprobación por target -

  // Videos
  const videos: VideoFromServer[] = []
  if (target === 'videos' && 'videos' in serverResponse && Array.isArray(serverResponse.videos)) {
    for (const v of serverResponse.videos) {
      if (!isValidVideo(v)) continue

      videos.push(v)
    }
  }

  // Búsqueda
  const results: SearchResults = []
  if (target === 'search' && 'results' in serverResponse && Array.isArray(serverResponse.results)) {
    for (const v of serverResponse.results) {
      if (!isValidVideo(v)) continue

      results.push(v)
    }
  }

  return {
    success,
    videos,
    results
  }
}
