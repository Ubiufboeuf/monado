import { padStart } from './utils'

export function parseDuration (duration: number) {
  let h = 0
  let m = 0
  let s = 0

  h = Math.floor(duration / 3600)
  m = Math.floor(duration / 60)
  s = Math.floor(duration % 60)

  if (h) return `${h}:${padStart(m, 2, '0')}:${padStart(s, 2, '0')}`
  if (m) return `${m}:${padStart(s, 2, '0')}`
  return s
}
