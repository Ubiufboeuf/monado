import { showControlsAndScheduleHide } from '@/lib/player/playerActions'
import type { TargetedEvent } from 'preact'
import type { ReactNode } from 'preact/compat'

interface Props {
  class?: string
  onClick?: (event: TargetedEvent<HTMLButtonElement>) => void
  stopPropagation?: boolean
  disableDefaultBehavior?: boolean
  children?: ReactNode
}

export function FloatingButton ({ class: className, onClick, stopPropagation = true, disableDefaultBehavior = false, children }: Props) {
  function handleClick (event: TargetedEvent<HTMLButtonElement>) {
    if (disableDefaultBehavior) {
      onClick?.(event)
      return
    }
    
    if (stopPropagation) {
      event.stopPropagation()
    }

    showControlsAndScheduleHide()
    onClick?.(event)
  }

  return (
    <button
      class={`${className} absolute flex items-center justify-center rounded-full transition-colors shr:bg-neutral-400/30`}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}
