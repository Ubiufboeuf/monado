/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ButtonItem } from '@/types/env'
import { Icon } from '../Icon'

interface TabBarButton extends ButtonItem {
  onClick: (...args: any[]) => void
  itemActive: boolean
}

export function TabBarButton ({ Icon: LinkIcon, name, onClick, itemActive }: TabBarButton) {
  return (
    <button
      class={`${itemActive ? 'active' : ''} group flex flex-col items-center justify-center gap-1 h-full w-13 mtb:w-17.75`}
      onClick={onClick}
    >
      <div class='flex items-center justify-center h-fit w-fit p-1 px-2 mtb:px-4 rounded-full text-neutral-300 group-[.active]:bg-neutral-700 transition-colors'>
        <Icon class='size-6'>
          <LinkIcon active={itemActive} />
        </Icon>
      </div>
      <h1 class='text-xs text-neutral-300 group-[.active]:text-white'>{name}</h1>
    </button>
  )
}
