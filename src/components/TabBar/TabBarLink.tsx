/* eslint-disable @typescript-eslint/no-explicit-any */
import type { LinkItem } from '@/types/env'
import { Icon } from '../Icon'

interface TabBarLink extends LinkItem {
  onClick: (...args: any[]) => void
  itemActive: boolean
}

export function TabBarLink ({ Icon: LinkIcon, path, name, itemActive, onClick }: TabBarLink) {
  return (
    <a
      href={path}
      class={`${itemActive ? 'active' : ''} group flex flex-col items-center justify-center gap-1 h-full w-13 mtb:w-17.75`}
      onClick={onClick}
    >
      <div class='flex items-center justify-center h-fit w-fit p-1 px-2 mtb:px-4 rounded-full text-neutral-300 group-[.active]:bg-neutral-700'>
        <Icon class='size-6'>
          <LinkIcon active={itemActive} />
        </Icon>
      </div>
      <h1 class='text-xs text-neutral-300 group-[.active]:text-white'>{name}</h1>
    </a>
  )
}
