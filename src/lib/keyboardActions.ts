import { backwardTime, forwardTime, showControlsAndScheduleHide, toggleCinemaMode, toggleFullScreen, togglePlayState } from './player/playerActions'
import { throttle } from './utils'

const TIMEOUT = 60

export const validKeys = [
  't',
  'f',
  ' ',
  'arrowleft',
  'arrowright'
] as const

export type ValidKey = typeof validKeys[number]

interface KeyboardAction {
  key: typeof validKeys[number]  
  action: (event: KeyboardEvent) => void
  preventDefault?: boolean
}

export const keyboardActions: KeyboardAction[] = [
  { key: 't', action: throttle(toggleCinemaMode, TIMEOUT) },
  { key: 'f', action: throttle(toggleFullScreen, TIMEOUT) },
  { key: ' ', action: throttle(handleSpacebar, TIMEOUT), preventDefault: true },
  { key: 'arrowleft', action: throttle(handleBackwardTime, TIMEOUT) },
  { key: 'arrowright', action: throttle(handleForwardTime, TIMEOUT) }
]

export function handleSpacebar (event: KeyboardEvent) {
  const target = event.target as HTMLElement
  if (target.tagName === 'INPUT' || target.tagName === 'BUTTON') return
  
  togglePlayState()
  showControlsAndScheduleHide()
}

export function handleBackwardTime () {
  backwardTime()
}

export function handleForwardTime () {
  forwardTime()
}
