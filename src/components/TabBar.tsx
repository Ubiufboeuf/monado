/* eslint-disable react/prop-types */
import type { ItemAside } from '@/types/env'
import { IconLibrary, IconHome, IconSearch, IconShorts, IconSubscriptions } from './Icons'
import { Icon } from './Icon'
import { v4 as uuidv4 } from 'uuid'

const barLinks: ItemAside[] = [
  { name: 'Inicio', path: '/', Icon: ({ active = false }) => <IconHome active={active} /> },
  { name: 'Shorts', path: '/shorts', Icon: ({ active = false }) => <IconShorts active={active} /> },
  { name: 'Buscar', path: '/search', Icon: ({ active = false }) => <IconSearch active={active} /> },
  { name: 'Subs', path: '/subs', Icon: ({ active = false }) => <IconSubscriptions active={active} /> },
  { name: 'Biblioteca', path: '/library', Icon: ({ active = false }) => <IconLibrary active={active} /> }
]

export function TabBar () {
  const path = '/'
  
  return (
    <nav class='fixed bottom-0 flex desktop:hidden items-center justify-evenly h-18 w-full sm:px-4 border-t overflow-x-auto [scrollbar-width:none] backdrop-blur-2xl bg-base-dark/80 border-neutral-700'>
      { barLinks.map(({ name, path: link, Icon: LinkIcon }) => (
        <a
          key={uuidv4()}
          href={link}
          class={`${path === link ? 'active' : ''} group flex flex-col items-center justify-center gap-1 h-full w-13 mtb:w-17.75`}
        >
          <div class='flex items-center justify-center h-fit w-fit p-1 px-2 mtb:px-4 rounded-full text-neutral-300 group-[.active]:bg-neutral-700'>
            <Icon class='size-6'>
              <LinkIcon active={path === link} />
            </Icon>
          </div>
          <h1 class='text-xs text-neutral-300 group-[.active]:text-white'>{name}</h1>
        </a>
      )) }
    </nav>    
  )
}
