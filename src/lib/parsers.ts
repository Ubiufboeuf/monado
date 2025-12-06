import { padStart } from './utils'

export function parseDuration (duration: number) {
  let h = 0
  let m = 0
  let s = 0

  h = Math.floor(duration / 3600)
  m = Math.floor(duration / 60) % 60
  s = Math.floor(duration % 60)

  if (h) return `${h}:${padStart(m, 2, '0')}:${padStart(s, 2, '0')}`
  return `${m}:${padStart(s, 2, '0')}`
}

export function parseViews (views: number) {
  let parsedViews = `${views ?? 0}`
  let multiplo = ''
  let v = `${views}`

  if (v.length < 4) {
    multiplo = ''
  } else if (v.length < 7) {
    multiplo = ' k'
    views /= 1000
  } else if (v.length < 10) {
    multiplo = ' M'
    views /= 1000 ** 2
  } else {
    multiplo = ' B'
    views /= 1000 ** 3
  }
  v = `${views}`
  if (views < 10) {
    parsedViews = (v.includes('.') && !v.includes('.0'))
      ? `${views.toString().substring(0, 3)}${multiplo}`
      : `${views.toFixed(0)}${multiplo}`
  } else if (views < 100) {
    parsedViews = `${views.toString().substring(0, 2)}${multiplo}`
  } else {
    parsedViews = `${views.toString().substring(0, 3)}${multiplo}`
  }

  return parsedViews
}
