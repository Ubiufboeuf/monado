import { useEffect } from 'preact/compat' // O 'preact/hooks' si usas Preact

interface KeybindsProps {
  keys: string
  size?: 'sm' | 'md' | 'lg'
  onBind?: (event: KeyboardEvent) => void
  onRelease?: (event: KeyboardEvent) => void
  when?: boolean | (() => boolean)
  relax?: 'any-special'
  class?: string
  hidden?: boolean
}

export function Keybinds ({ keys, onBind, onRelease, when = true, relax, class: className = '', hidden }: KeybindsProps) {
  useEffect(() => {
    if (!onBind) return

    function handleKeyDown (event: KeyboardEvent) {
      const isAllowed = typeof when === 'function' ? when() : when
      if (!isAllowed) return
      
      const keyArray = keys.toLowerCase().split(/[\s]+/)

      const requiresCtrl = keyArray.includes('ctrl') || keyArray.includes('control')
      const requiresShift = keyArray.includes('shift')
      const requiresAlt = keyArray.includes('alt')
      const requiresMeta = keyArray.includes('cmd') || keyArray.includes('meta') || keyArray.includes('command')
     
      let mainKeys = [...keyArray]

      if (relax !== 'any-special') {
        if (event.ctrlKey !== requiresCtrl) return
        if (event.shiftKey !== requiresShift) return
        if (event.altKey !== requiresAlt) return
        if (event.metaKey !== requiresMeta) return
        
        const modifierNames = ['ctrl', 'control', 'shift', 'alt', 'cmd', 'meta', 'command']
        mainKeys = keyArray.filter(k => !modifierNames.includes(k))
      }

      let key = event.key.toLowerCase()
      if (key === ' ') key = 'space'
      
      if (mainKeys.includes(key)) {
        event.preventDefault()
        onBind?.(event)

        if (onRelease) {
          const targetKey = event.key.toLowerCase()
          const targetCode = event.code

          function handleSpecificKeyUp (upEvent: KeyboardEvent) {
            if (upEvent.key.toLowerCase() === targetKey || upEvent.code === targetCode) {
              upEvent.preventDefault()
              onRelease?.(upEvent)
              window.removeEventListener('keyup', handleSpecificKeyUp)
            }
          }

          window.addEventListener('keyup', handleSpecificKeyUp)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [keys, onBind, onRelease, when])

  const displayKeys = keys.split(/[\s+]+/)

  return (
    <span class={`${className} flex items-center gap-1 pointer-events-none select-none`} hidden={hidden}>
      { displayKeys.map((k, i) => <kbd key={`${k}-${i}`} class=''>{k}</kbd>) }
    </span>
  )
}
