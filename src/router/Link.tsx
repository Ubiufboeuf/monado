import type { HTMLAttributeAnchorTarget, TargetedMouseEvent } from 'preact'
import { navigate } from './navigate'
import type { ReactNode } from 'preact/compat'

interface LinkProps {
  to: string
  class?: string
  target?: HTMLAttributeAnchorTarget
  onClick?: (event: TargetedMouseEvent<HTMLAnchorElement>) => void
  children: ReactNode[]
}

export function Link ({ to, class: className, target, onClick, ...props }: LinkProps) {
  function handleClick (event: TargetedMouseEvent<HTMLAnchorElement>) {
    const isMainEvent = event.button === 0
    const isModifiedEvent = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey
    const isManageableEvent = target === undefined || target === '_self'

    if (isMainEvent && !isModifiedEvent && isManageableEvent) {
      event.preventDefault()
      navigate(to)
    }
  }

  return (
    <a href={to} target={target} class={className} onClick={onClick ?? handleClick} {...props} />
  )
}
