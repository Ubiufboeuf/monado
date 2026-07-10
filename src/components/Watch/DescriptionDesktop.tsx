import { useDescription } from '@/hooks/useDescription'
import { DescriptionFallback } from '@/components/Watch/DescriptionFallback'
import { Channel } from './Channel'
import { Icon } from '../Icon'
import { IconAddToPlaylist, IconDots, IconShare, IconWatchLater } from '../Icons'
import { parseDescription } from '@/lib/parsers'

export function DescriptionDesktop () {
  const videoDescription = useDescription()
  if (!videoDescription) return <DescriptionFallback />
  
  const { title, description, creator } = videoDescription

  return (
    <section class='h-full w-full not-desktop:*:px-4 cinema:*:px-4 not-xs:*:px-4'>
      <h1 class='text-lg font-semibold text-start text-wrap! line-clamp-2 md:line-clamp-1'>{title}</h1>
      <div class='flex justify-between items-center w-full py-1 pb-2'>
        <Channel creator={creator} />
        <div class='flex justify-end gap-2 w-fit'>
          <div>
            <button class='p-2 rounded-full cursor-pointer bg-neutral-700/50'>
              <Icon class='size-5 text-transparent'>
                <IconShare />
              </Icon>
            </button>
          </div>
          <div>
            <button class='p-2 rounded-full cursor-pointer bg-neutral-700/50'>
              <Icon class='size-5'>
                <IconAddToPlaylist />
              </Icon>
            </button>
          </div>
          <div>
            <button class='p-2 rounded-full cursor-pointer bg-neutral-700/50'>
              <Icon class='size-5'>
                <IconWatchLater />
              </Icon>
            </button>
          </div>
          <div>
            <button class='p-2 rounded-full cursor-pointer bg-neutral-700/50'>
              <Icon class='size-5 rotate-90'>
                <IconDots />
              </Icon>
            </button>
          </div>
        </div>
      </div>
      <div class='p-4 px-5 rounded-xl border border-neutral-700 hover:bg-neutral-700 transition-colors cursor-pointer'>
        <p class='text-sm leading-4' dangerouslySetInnerHTML={{ __html: parseDescription(description) }}></p>
      </div>
    </section>
  )
}
