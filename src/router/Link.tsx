import type { HTMLAttributeAnchorTarget, TargetedMouseEvent } from 'preact'
import { navigate } from './navigate'

interface LinkProps {
  to: string
  target?: HTMLAttributeAnchorTarget
}

export function Link ({ to, target, ...props }: LinkProps) {
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
    <a href={to} target={target} onClick={handleClick} {...props} />
  )
}
