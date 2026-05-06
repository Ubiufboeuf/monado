import { usePlayerStore } from '@/stores/usePlayerStore'
import { useEffect, useState, type ReactNode } from 'preact/compat'

interface Menu {
  id: string
  content: ReactNode
}

const menus: Menu[] = [
  { id: 'quality', content: 'resoluciones' },
  { id: 'settings', content: 'ajustes' }
]

export function MenuPanel () {
  const currentMenu = usePlayerStore((state) => state.currentMenu)
  const [CurrentMenu, setCurrentMenu] = useState<(() => ReactNode) | undefined>(() => currentMenu)

  useEffect(() => {
    if (!currentMenu) {
      setCurrentMenu(undefined)
      return
    }

    const newContent = menus.find((menu) => menu.id === currentMenu)?.content
    if (!newContent) return
    
    setCurrentMenu(() => newContent)
  }, [currentMenu])

  if (!CurrentMenu) return
  
  return (
    <div
      class='absolute right-3 bottom-17 w-fit h-fit rounded-lg bg-base-dark'
      onClick={(e) => e.stopPropagation()}
    >
      <CurrentMenu />
    </div>
  )
}
