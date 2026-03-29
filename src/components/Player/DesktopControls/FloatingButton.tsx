import type { TargetedEvent } from 'preact'
import type { ReactNode } from 'preact/compat'

interface Props {
  class?: string
  onClick?: (event: TargetedEvent<HTMLButtonElement>) => void
  stopPropagation?: boolean
  children?: ReactNode
}

export function FloatingButton ({ class: className, onClick, stopPropagation = true, children }: Props) {
  function handleClick (event: TargetedEvent<HTMLButtonElement>) {
    if (stopPropagation) {
      event.stopPropagation()
    }

    onClick?.(event)
  }

  return (
    <button
      class={`${className} absolute flex items-center justify-center rounded-full cursor-pointer transition-colors shr:bg-neutral-700/70`}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}
