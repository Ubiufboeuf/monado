/* eslint-disable react/prop-types */
import type { ItemAside } from '@/types/env'
import { IconHome, IconExplore, IconShorts, IconTV, IconHistory, IconWatchLater, IconLikedVideos, IconPlaylists, IconCollections, IconSubscriptions } from '@/components/Icons'

export const itemsAside: ItemAside[][] = [
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
