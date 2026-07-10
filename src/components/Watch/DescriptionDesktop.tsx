import { useDescription } from '@/hooks/useDescription'
import { formatCompactNumber } from '@/lib/parsers'
import { IconAddToPlaylist, IconCalendar, IconChevronDown, IconComments, IconDislike, IconEye, IconLike, IconShare, IconVerified, IconWatchLater } from '../Icons'
import { Icon } from '../Icon'
import { DescriptionFallback } from '@/components/Watch/DescriptionFallback'

export function DescriptionDesktop () {
  const videoDescription = useDescription()
  if (!videoDescription) return <DescriptionFallback />
  
  const { title, description, likes, creator } = videoDescription

  function toggleDescription () {

  }
  
  return (
    <section class='h-full w-full not-desktop:*:px-4 cinema:*:px-4 not-xs:*:px-4'>
      <button class='flex' onClick={toggleDescription}>
        <h1 class='text-lg font-semibold text-start text-wrap! line-clamp-2 md:line-clamp-1'>{title}</h1>
        <Icon class='size-7 shrink-0'>
          <IconChevronDown />
        </Icon>
      </button>
      <button class='h-10 flex items-center' onClick={toggleDescription}>
        <span class='line-clamp-1 text-start text-sm text-neutral-400'>{description}</span>
      </button>
      <div class='flex items-center gap-6'>
        <div class='flex items-center gap-1.5 text-neutral-400'>
          <Icon class='size-5'>
            <IconEye />
          </Icon>
          <span class='text-xs'>120K</span>
        </div>
        <div class='flex items-center gap-1.5 text-neutral-400'>
          <Icon class='size-5'>
            <IconCalendar />
          </Icon>
          <span class='text-xs'>12 Nov 24</span>
        </div>
      </div>
      <div class='h-12 grid grid-cols-[1fr_auto] justify-between items-center pt-2 gap-2'>
        <a class='flex items-center select-none gap-2 pr-3 rounded-full transition-colors pointer-fine:hover:bg-neutral-700 pointer-coarse:active:bg-neutral-700'>
          <Icon class='size-9 shrink-0 rounded-full'>
            <img src='https://yt3.googleusercontent.com/7RTUWg2TtuePRG058YOwhFqeIDtb6uVAAMKLzh-b_uNfvMLPhfYcE2mRV2y2bv556370ZVMS=s120-c-k-c0x00ffffff-no-rj' />
          </Icon>
          <h1 class='line-clamp-1 text-sm font-semibold text-neutral-50'>{creator.name}</h1>
          <Icon class='size-4 shrink-0 text-neutral-200'>
            <IconVerified />
          </Icon>
          <span class='text-xs shrink-0 text-neutral-400'>{formatCompactNumber(creator.subscribers)}</span>
        </a>
        <button class='group relative p-2 px-4 rounded-full font-semibold text-sm overflow-hidden bg-linear-to-br from-gradient-start to-gradient-end'>
          <div class='absolute h-full w-full left-1/2 top-1/2 -translate-1/2 transition-colors bg-black/0 group-shr:bg-neutral-800/30' />
          <span class='relative'>Suscribirse</span>
        </button>
      </div>
      <div class='h-13 flex items-center w-full pt-2 *:shrink-0 gap-2 overflow-x-auto [scrollbar-width:none]'>
        <div class='flex items-center h-full'>
          <button class='flex items-center justify-center gap-2 p-1.5 px-3.5 pr-4 rounded-l-full bg-neutral-700/70'>
            <Icon>
              <IconLike />
            </Icon>
            <span class='text-sm font-medium'>{formatCompactNumber(likes || 22 * 1000)}</span>
          </button>
          <div class='flex items-center h-9 w-px bg-neutral-700/70'>
            <div class='h-7 w-full bg-neutral-600' />
          </div>
          <button class='p-1.5 px-4 rounded-r-full bg-neutral-700/70'>
            <Icon>
              <IconDislike />
            </Icon>
          </button>
        </div>
        <div>
          <button class='flex items-center justify-center gap-2 p-1.5 px-3.5 pr-4 rounded-full bg-neutral-700/70'>
            <Icon class='size-6'>
              <IconComments />
            </Icon>
            <span class='text-sm font-medium'>1.4K</span>
          </button>
        </div>
        <div>
          <button class='p-1.5 px-4 rounded-full bg-neutral-700/70'>
            <Icon class='size-6 text-transparent'>
              <IconShare />
            </Icon>
          </button>
        </div>
        <div>
          <button class='p-1.5 px-4 rounded-full bg-neutral-700/70'>
            <Icon class='size-6'>
              <IconAddToPlaylist />
            </Icon>
          </button>
        </div>
        <div>
          <button class='p-1.5 px-4 rounded-full bg-neutral-700/70'>
            <Icon class='size-6'>
              <IconWatchLater />
            </Icon>
          </button>
        </div>
      </div>
      <div class='flex items-end justify-center h-2 w-full'>
        <div class='h-px w-full bg-neutral-700' />
      </div>
    </section>
  )
}
