import { Icon } from '@/components/ui/Icon'
import type { ComponentChildren, TargetedEvent } from 'preact'

interface Props {
  class?: string
  icon?: () => ComponentChildren
  iconClass?: string
  onClick?: (event: TargetedEvent<HTMLButtonElement>) => void
}

export function Button ({ class: className = '', icon: ButtonIcon, iconClass = '', onClick }: Props) {
  function handleClick (event: TargetedEvent<HTMLButtonElement>) {
    onClick?.(event)
  }
  
  return (
    <button
      class={`${className} absolute flex items-center justify-center rounded-full outline-0 transition-colors shr:bg-neutral-400/30 focus-visible:border-2 focus-visible:border-blue-500`}
      onClick={handleClick}
    >
      { ButtonIcon && <Icon class={iconClass}><ButtonIcon /></Icon> }
    </button>
  )
}
