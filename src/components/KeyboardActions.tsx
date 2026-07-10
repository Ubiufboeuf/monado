import { keyboardActions, validKeys, type ValidKey } from '@/lib/keyboardActions'
import { useEffect, useState } from 'preact/hooks'

export function KeyboardActions () {
  const [container, setContainer] = useState<Element>()

  function handleKeyDown (e: KeyboardEvent) {
    const ct = e.currentTarget
    if (!ct) return

    const lk = e.key.toLowerCase()
    if (!validKeys.includes(lk as ValidKey)) return

    const keyboardAction = keyboardActions.find(({ key }) => key === lk)
    if (!keyboardAction) return

    const { action, preventDefault } = keyboardAction

    if (preventDefault) { e?.preventDefault() }

    action(e)
  }
  
  useEffect(() => {
    const $playerContainer = document.querySelector('#player-container')
    if ($playerContainer) setContainer($playerContainer)
  }, [])

  useEffect(() => {
    if (!container) return

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [container])
}
