/* eslint-disable react/prop-types */
import type { ItemAside } from '@/types/env'
import { IconLibrary, IconHome, IconSearch, IconShorts, IconSubscriptions } from './Icons'
import { TabBarLink } from './TabBar/TabBarLink'
import { TabBarButton } from './TabBar/TabBarButton'
import { useState } from 'preact/hooks'
import type { TargetedMouseEvent } from 'preact'
import { navigate } from '@/router/navigate'

const defaultLinks: ItemAside[] = [
  { id: 'home', name: 'Inicio', type: 'link', path: '/', Icon: ({ active = false }) => <IconHome active={active} /> },
  { id: 'shorts', name: 'Shorts', type: 'link', path: '/shorts', Icon: ({ active = false }) => <IconShorts active={active} /> },
  { id: 'search', name: 'Buscar', type: 'button', Icon: ({ active = false }) => <IconSearch active={active} /> },
  { id: 'subs', name: 'Subs', type: 'link', path: '/subs', Icon: ({ active = false }) => <IconSubscriptions active={active} /> },
  { id: 'library', name: 'Biblioteca', type: 'link', path: '/library', Icon: ({ active = false }) => <IconLibrary active={active} /> }
]

export function TabBar ({ pathname, hidden }: { pathname: string, hidden?: boolean | undefined }) {
  const [barLinks] = useState(defaultLinks)
  const [isTabBarSearching, setIsTabBarSearching] = useState(false)

  function handleClickSearch () {
    setIsTabBarSearching(!isTabBarSearching)
  }

  function handleClickLink (event: TargetedMouseEvent<HTMLAnchorElement>) {
    const isMainEvent = event.button === 0
    const isModifiedEvent = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey
    const path = event.currentTarget.getAttribute('path')

    if (!path) return
  
    if (isMainEvent && !isModifiedEvent) {
      event.preventDefault()
      setIsTabBarSearching(false)
      navigate(path)
    }
  }

  return (
    <nav
      class='fixed bottom-0 flex desktop:hidden items-center justify-evenly h-tbh w-full sm:px-4 border-t overflow-x-auto [scrollbar-width:none] backdrop-blur-2xl bg-base-dark/80 border-neutral-700'
      hidden={hidden}
    >
      { barLinks.map((barLink) => {
        const { id, type } = barLink

        if (id === 'search' && type === 'button') return (
          <TabBarButton
            key={`tab-bar:${id}`}
            onClick={handleClickSearch}
            itemActive={isTabBarSearching}
            {...barLink}
          />
        )

        if (type === 'link') return (
          <TabBarLink
            key={`tab-bar:${id}`}
            itemActive={pathname === barLink.path && !isTabBarSearching}
            onClick={handleClickLink}
            {...barLink}
          />
        )
      }) }
    </nav>    
  )
}
