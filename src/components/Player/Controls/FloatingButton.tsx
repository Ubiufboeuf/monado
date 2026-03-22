import type { TargetedEvent } from 'preact'
import type { ReactNode } from 'preact/compat'

interface Props {
  class?: string
  onClick?: (event: TargetedEvent<HTMLButtonElement>) => void
  children?: ReactNode
}

export function FloatingButton ({ class: className, onClick, children }: Props) {
  return (
    <button
      class={`${className} absolute flex items-center justify-center rounded-full cursor-pointer transition-colors shr:bg-neutral-700/70`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
