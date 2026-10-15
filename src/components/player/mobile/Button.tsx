import { Icon } from '@/components/ui/Icon'
import { showControlsAndScheduleHide } from '@/lib/player/playerActions'
import type { ComponentChildren, TargetedEvent } from 'preact'

interface Props {
  class?: string
  icon?: () => ComponentChildren
  iconClass?: string
  onClick?: (event: TargetedEvent<HTMLButtonElement>) => void
  stopPropagation?: boolean
  disableDefaultBehavior?: boolean
  children?: ComponentChildren
}

export function Button ({ class: className = '', icon: ButtonIcon, iconClass = '', onClick, stopPropagation = true, disableDefaultBehavior = false, children }: Props) {
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
      class={`${className} absolute flex items-center justify-center rounded-full outline-0 cursor-pointer transition-colors shr:bg-neutral-400/30 border-2 border-transparent focus-visible:border-blue-500`}
      onClick={handleClick}
    >
      { ButtonIcon && <Icon class={iconClass}><ButtonIcon /></Icon> }
      { children }
    </button>
  )
}
