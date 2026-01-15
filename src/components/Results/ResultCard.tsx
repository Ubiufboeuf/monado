import { parseDuration, parseViews } from '@/lib/parsers'
import type { Video } from '@/types/videoTypes'
import type { TargetedEvent } from 'preact'
import { useRef } from 'preact/hooks'

export function ResultCard ({ video }: { video: Video }) {
  const { id, title, duration, uploader, thumbnailsById, min_thumbnail, max_thumbnail } = video

  const fallbackRef = useRef<HTMLImageElement>(null)
  const thumbnailRef = useRef<HTMLImageElement>(null)
  
  function checkIfSquare (image: HTMLImageElement) {
    const { naturalWidth, naturalHeight } = image
    const aspectRatio = naturalWidth / naturalHeight

    const upper_threshold = 1.1
    const lower_threshold = 0.9
    const tolerance = 0.1

    const isSquare =
      ((aspectRatio + tolerance) <= upper_threshold)
      &&
      ((aspectRatio - tolerance) >= lower_threshold)
    
    if (isSquare) {
      image.classList.add('isSquare')
    }
  }
  
  function handleLoadThumbnail (event: TargetedEvent<HTMLImageElement>) {
    const image = event.currentTarget
    if (image.complete) {
      image.classList.remove('opacity-0')
    }

    checkIfSquare(image)
  }
  
  return (
    <a
      href={`/watch?v=${id}`}
      class='videoListCard flex items-start justify-between gap-2 h-fit w-full'
      title={title}
    >
      <section class='relative flex items-end justify-center h-full w-4/10 aspect-video rounded-lg overflow-hidden'>
        <div class='relative h-full w-full bg-neutral-700'>
          { thumbnailsById[min_thumbnail] &&
            <img
              ref={fallbackRef}
              src={thumbnailsById[min_thumbnail].url}
              class='h-full w-full object-cover [.isSquare]:object-contain flex pointer-events-none select-none blur'
              onLoad={handleLoadThumbnail}
            />
          }
          { thumbnailsById[max_thumbnail] &&
            <img
              ref={thumbnailRef}
              src={thumbnailsById[max_thumbnail].url}
              class='opacity-0 absolute left-0 top-0 h-full w-full object-cover [.isSquare]:object-contain flex pointer-events-none select-none'
              alt={title}
              onLoad={handleLoadThumbnail}
            />
          }
        </div>
        <time class='absolute bottom-1.5 right-1.5 bg-[#000a] rounded font-semibold text-xs px-1 py-0.5'>{parseDuration(duration)}</time>
      </section>
      <section class='flex-1'>
        <strong class='text-sm font-medium text-start line-clamp-2 pt-0.5 pr-3 text-neutral-100'>{title}</strong>
        <span class='text-xs text-start line-clamp-2 pt-0.5 text-neutral-400'>{uploader}</span>
        <div class='text-xs text-start line-clamp-2 pt-0.5 text-neutral-400'>
          <span>{parseViews(309000)} vistas</span>
          &nbsp;<span>•</span>&nbsp;
          <span>hace 20 días</span>
        </div>
      </section>
    </a>
  )
}
