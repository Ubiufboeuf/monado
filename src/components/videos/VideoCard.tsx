import { formatCompact, formatTime } from '@/lib/formatters'
import type { Video } from '@/types/videoTypes'
import { Icon } from '../ui/Icon'
import { IconEye } from '../ui/Icons'

interface Props {
  video: Video
  to: string
}

export function VideoCard ({ to, video: { title, thumbnail, duration, creator, views } }: Props) {
  return (
    <a
      href={to}
      class='h-fit flex flex-col xs:flex-row xs:rounded-xl xs:p-2 gap-3 transition-colors shr:bg-neutral-800/40'
    >
      <div class='relative aspect-video w-full xs:w-auto xs:h-28 xs:rounded-md shrink-0 overflow-hidden'>
        <img src={thumbnail} class='h-full w-full object-cover' />
        <span class='absolute right-1 bottom-1 text-xs bg-neutral-800/90 backdrop-blur px-1 p-0.5 rounded'>{formatTime(duration)}</span>
        <span class='absolute left-1 bottom-1 flex items-center gap-1 text-xs bg-neutral-800/90 backdrop-blur px-1 p-0.5 rounded'>
          <Icon class='size-4'>
            <IconEye />
          </Icon>
          {formatCompact(views)}
        </span>
      </div>
      <div class='px-3 xs:px-0'>
        <h1 class='text-lg xs:text-base font-semibold line-clamp-2 wrap-anywhere'>{title}</h1>
        <a href={creator.channelUrl} target='_blank' rel='noopener noreferrer' class='text-xs font-semibold text-neutral-400'>{creator.name}</a>
      </div>
    </a>
  )
}
