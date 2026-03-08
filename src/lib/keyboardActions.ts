import { toggleCinemaMode, toggleFullScreen } from './playerActions'
import { throttle } from './utils'

const TIMEOUT = 60

export const validKeys = [
  't',
  'f'
] as const

export type ValidKey = typeof validKeys[number]

interface KeyboardAction {
  key: typeof validKeys[number]  
  action: (event: KeyboardEvent) => void
  preventDefault?: boolean
}

export const keyboardActions: KeyboardAction[] = [
  { key: 't', action: throttle(toggleCinemaMode, TIMEOUT) },
  { key: 'f', action: throttle(toggleFullScreen, TIMEOUT) }
]
