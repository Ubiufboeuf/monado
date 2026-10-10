import type { Video } from '@/types/videoTypes'

interface Props {
  video: Video
  to: string
}

export function VideoCard ({ to, video: { title } }: Props) {
  return (
    <a
      href={to}
      class='h-fit flex flex-col xs:flex-row xs:rounded-xl xs:p-2 gap-3 transition-colors shr:bg-neutral-800/40'
    >
      <div class='aspect-video w-full xs:w-auto xs:h-28'>
        <div class='h-full w-full xs:rounded-md bg-neutral-900' />
      </div>
      <div class='px-3 xs:px-0'>
        <h1 class='text-sm'>{title}</h1>
      </div>
    </a>
  )
}
