import type { Creator } from '@/types/creatorTypes'
import { Icon } from '../Icon'
import { formatCompactNumber } from '@/lib/parsers'

export function Channel ({ creator }: { creator: Creator }) {
  const { channelUrl, name, subscribers, assets } = creator
  const { profile } = assets

  return (
    <a href={channelUrl} class='flex py-2 gap-4 w-fit shrink-0'>
      <Icon class='size-9 rounded-full overflow-hidden'>
        <img src={profile} />
      </Icon>
      <div class='flex flex-col'>
        <strong class='text-sm'>{name}</strong>
        <span class='text-xs'>{formatCompactNumber(subscribers)} suscriptores</span>
      </div>
      <button class='group cursor-pointer relative p-2 px-4 rounded-full font-semibold text-sm overflow-hidden bg-linear-to-br from-gradient-start to-gradient-end'>
        <div class='absolute h-full w-full left-1/2 top-1/2 -translate-1/2 transition-colors bg-black/0 group-shr:bg-neutral-800/30' />
        <span class='relative'>Suscribirse</span>
      </button>
    </a>
  )
}
