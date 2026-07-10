import { showControlsAndScheduleHide } from '@/lib/player/playerActions'
import type { TargetedEvent } from 'preact'
import type { ReactNode } from 'preact/compat'

interface Props {
  class?: string
  onClick?: (event: TargetedEvent<HTMLButtonElement>) => void
  stopPropagation?: boolean
  menuId?: string
  children?: ReactNode
}

export function FloatingButton ({ class: className, onClick, stopPropagation = true, menuId, children }: Props) {
  function handleClick (event: TargetedEvent<HTMLButtonElement>) {
    if (stopPropagation) {
      event.stopPropagation()
    }

    showControlsAndScheduleHide()
    onClick?.(event)
  }

  return (
    <button
      class={`${className} absolute flex items-center justify-center rounded-full cursor-pointer transition-colors shr:bg-neutral-400/30`}
      onClick={handleClick}
      data-menu-id={menuId}
    >
      {children}
    </button>
  )
}
