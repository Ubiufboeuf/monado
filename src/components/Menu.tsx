/* eslint-disable react/prop-types */
import type { ItemAside } from '@/types/env'
import { IconHome, IconExplore, IconShorts, IconTV, IconHistory, IconWatchLater, IconLikedVideos, IconPlaylists, IconCollections, IconSubscriptions } from '@/components/Icons'
import { useId, useRef } from 'preact/hooks'
import { MenuExpandableLink } from './AsideNavigation/MenuExpandableLink'
import { MenuLink } from './AsideNavigation/MenuLink'

const itemsAside: ItemAside[][] = [
  [
    { name: 'Inicio', path: '/', Icon: ({ active = false }) => <IconHome active={active} /> },
    { name: 'Explorar', path: '/explore', Icon: ({ active = false }) => <IconExplore active={active} /> },
    { name: 'Shorts', path: '/shorts', Icon: ({ active = false }) => <IconShorts active={active} /> },
    { name: 'Modo TV', path: '/tv', Icon: ({ active = false }) => <IconTV active={active} /> }
  ],
  [
    { name: 'Historial', path: '/you/history', Icon: ({ active = false }) => <IconHistory active={active} /> },
    { name: 'Ver luego', path: '/you/watch_later', Icon: ({ active = false }) => <IconWatchLater active={active} /> },
    { name: 'Gustados', path: '/you/liked_videos', Icon: ({ active = false }) => <IconLikedVideos active={active} /> },
    { name: 'Playlists', path: '/you/playlists', type: 'expand', Icon: ({ active = false }) => <IconPlaylists active={active} /> }
  ],
  [
    { name: 'Colecciones', path: '/you/collections', type: 'expand', Icon: ({ active = false }) => <IconCollections active={active} /> },
    { name: 'Suscripciones', path: '/you/subscriptions', type: 'expand', Icon: ({ active = false }) => <IconSubscriptions active={active} /> }
  ]
]

export function Menu () {
  const path = '/'
  const asideMenuRef = useRef<HTMLElement>(null)

  return (
    <aside
      ref={asideMenuRef}
      id='asideMenu'
      class='fixed top-14 left-0 menu-open:-left-60 [transition:left_250ms_ease] z-100 w-60 h-[calc(100dvh-56px)] bg-base'
    >
      <div class='h-full w-full max-h-full flex flex-col items-center gutter-stable px-3 pr-1 pb-2 overflow-y-auto [scrollbar-width:thin]'>
        { itemsAside.map((item) => (
          <section key={useId()} class='flex flex-col w-full h-fit py-3 text-sm border-b border-neutral-700'>
            { item.map((item) => {
              const { Icon, name, type, path: link } = item
              return (type === 'expand') ? (
                <MenuExpandableLink
                  key={useId()}
                  item={item}
                  path={path}
                  asideMenuRef={asideMenuRef}
                />
              ) : (
                <MenuLink
                  key={useId()}
                  name={name}
                  link={link}
                  path={path}
                >
                  <Icon active={link === path} />
                </MenuLink>
              )
            }) }
          </section>
        ) )}
        <section>
          <a
            href='/about_this_project'
            class='cursor-pointer text-neutral-300 hover:text-blue-500 transition-colors'
          >
            Acerca de este proyecto
          </a>
        </section>
      </div>
    </aside>
  )
}
