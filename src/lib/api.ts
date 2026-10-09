import { ENDPOINTS } from '@/constants/api'

export function getManifest (id: string): string {
  const route = `${ENDPOINTS.STREAMS}/${id}/manifest.mpd`
  console.log(route)
  return route
}
