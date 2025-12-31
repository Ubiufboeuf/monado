import { Temporal } from 'temporal-polyfill'
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

const SECONDS_IN_YEAR = 31536000
const SECONDS_IN_MONTH = 2678400
const SECONDS_IN_WEEK = 604800
const SECONDS_IN_DAY = 86400
const SECONDS_IN_HOUR = 3600
const SECONDS_IN_MINUTE = 60

export function parseReleaseTimestamp (timestamp: number) {
  const timestampInSeconds = timestamp < 100_000_000_000
  const epoch = timestampInSeconds
    ? timestamp * 1000
    : timestamp
  
  const instant = Temporal.Instant.fromEpochMilliseconds(epoch)
  const now = Temporal.Now.instant()
  const dif = now.since(instant).seconds

  const year = Math.floor(dif / SECONDS_IN_YEAR)
  const month = Math.floor(dif / SECONDS_IN_MONTH)
  const week = Math.floor(dif / SECONDS_IN_WEEK)
  const day = Math.floor(dif / SECONDS_IN_DAY)
  const hour = Math.floor(dif / SECONDS_IN_HOUR)
  const minute = Math.floor(dif / SECONDS_IN_MINUTE)
  
  if (dif >= SECONDS_IN_YEAR)        return `${year}   ${year   === 1 ? 'año'     : 'años'}`
  else if (dif >= SECONDS_IN_MONTH)  return `${month}  ${month  === 1 ? 'mes'     : 'meses'}`
  else if (dif >= SECONDS_IN_WEEK)   return `${week}   ${week   === 1 ? 'semana'  : 'semanas'}`
  else if (dif >= SECONDS_IN_DAY)    return `${day}    ${day    === 1 ? 'día'     : 'días'}`
  else if (dif >= SECONDS_IN_HOUR)   return `${hour}   ${hour   === 1 ? 'hora'    : 'horas'}`
  else if (dif >= SECONDS_IN_MINUTE) return `${minute} ${minute === 1 ? 'minuto'  : 'minutos'}`
  else                               return `${dif}    ${dif    === 1 ? 'segundo' : 'segundos'}`
}
