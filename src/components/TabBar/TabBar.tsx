/* eslint-disable react/prop-types */
import type { TabBarItem } from '@/types/env'
import { IconLibrary, IconHome, IconSearch, IconShorts, IconSubscriptions } from '../Icons'
import { TabBarLink } from '../TabBar/TabBarLink'
import { TabBarButton } from '../TabBar/TabBarButton'
import { useState } from 'preact/hooks'
import type { TargetedMouseEvent } from 'preact'
import { useSearchStore } from '@/stores/useSearchStore'

const defaultLinks: TabBarItem[] = [
  { id: 'home', name: 'Inicio', type: 'link', path: '/', Icon: ({ active = false }) => <IconHome active={active} /> },
  { id: 'shorts', name: 'Shorts', type: 'link', path: '/shorts', Icon: ({ active = false }) => <IconShorts active={active} /> },
  { id: 'search', name: 'Buscar', type: 'button', Icon: ({ active = false }) => <IconSearch active={active} /> },
  { id: 'subs', name: 'Subs', type: 'link', path: '/subs', Icon: ({ active = false }) => <IconSubscriptions active={active} /> },
  { id: 'library', name: 'Biblioteca', type: 'link', path: '/library', Icon: ({ active = false }) => <IconLibrary active={active} /> }
]

export function TabBar ({ pathname, hidden }: { pathname: string, hidden?: boolean | undefined }) {
  const [barLinks] = useState(defaultLinks)
  const isMobileSearching = useSearchStore((state) => state.isMobileSearching)
  const setIsMobileSearching = useSearchStore((state) => state.setIsMobileSearching)

  function handleClickSearch () {
    setIsMobileSearching(!isMobileSearching)
  }

  function handleClickLink (event: TargetedMouseEvent<HTMLAnchorElement>) {
    const isMainEvent = event.button === 0
    const isModifiedEvent = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey
    const path = event.currentTarget.getAttribute('href')

    if (!path) return

    if (isMainEvent && !isModifiedEvent && pathname === path) {
      event.preventDefault()
      setIsMobileSearching(false)
    }
  }

  return (
    <nav
      class='fixed bottom-0 flex desktop:hidden items-center justify-evenly h-tbh w-full sm:px-4 overflow-x-auto [scrollbar-width:none] bg-base-dark'
      hidden={hidden}
    >
      { barLinks.map((barLink) => {
        const { id, type } = barLink

        if (id === 'search' && type === 'button') return (
          <TabBarButton
            key={`tab-bar:${id}`}
            onClick={handleClickSearch}
            itemActive={isMobileSearching}
            {...barLink}
          />
        )

        if (type === 'link') return (
          <TabBarLink
            key={`tab-bar:${id}`}
            itemActive={pathname === barLink.path && !isMobileSearching}
            onClick={handleClickLink}
            {...barLink}
          />
        )
      }) }
    </nav>    
  )
}
