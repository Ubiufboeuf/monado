import { changeTime, toggleCinemaMode, toggleFullScreen, togglePlayState } from './playerActions'
import { throttle } from './utils'

const REPEAT_LIMIT = 60

export const validKeys = [
  'f',
  ' ',
  'k',
  'j',
  'l',
  'arrowleft',
  'arrowright',
  't'
] as const

type KeyboardAction = {
  key: typeof validKeys[number],
  action: (event: KeyboardEvent) => void
  preventDefault?: boolean
}

export const playerKeyboardActions: KeyboardAction[] = [
  { key: 'f', action: throttle(toggleFullScreen, REPEAT_LIMIT) },
  { key: ' ', action: throttle(togglePlayState, REPEAT_LIMIT), preventDefault: true },
  { key: 'k', action: throttle(togglePlayState, REPEAT_LIMIT), preventDefault: true },
  { key: 'j', action: throttle(() => changeTime(-10), REPEAT_LIMIT) },
  { key: 'l', action: throttle(() => changeTime(10), REPEAT_LIMIT) },
  { key: 'arrowleft', action: throttle(() => changeTime(-5), REPEAT_LIMIT) },
  { key: 'arrowright', action: throttle(() => changeTime(5), REPEAT_LIMIT) },
  { key: 't', action: toggleCinemaMode }
]
