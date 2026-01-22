import type { Video } from '@/types/videoTypes'
import type { TargetedEvent, TargetedMouseEvent } from 'preact'
import { IconDots } from './Icons'
import { parseDuration, parseReleaseTimestamp, parseViews } from '@/lib/parsers'
import { navigate } from 'astro:transitions/client'

export function VideoCard ({ video, class: className = '' }: { video: Video, class?: string }) {
  const { id, title, duration, thumbnailsById, min_thumbnail, max_thumbnail } = video

  function changeVideo (event: TargetedMouseEvent<HTMLElement>) {
    event.preventDefault()
    
    navigate(`/watch?v=${video.id}`)
  }

  function showOptions (event: TargetedMouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    event.stopPropagation()

    console.log('show options')
  }

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
    <article class={`${className} cardWrapper group relative flex justify-center`}>
      <div class='not-xs:hidden absolute h-full w-full xs:not-sm:w-[max(80%,var(--breakpoint-xs))] sm:not-md:w-[min(100%,500px)] left-1/2 top-1/2 -translate-1/2 rounded-xl pointer-events-none transition-all duration-200 scale-98 group-hover:scale-103 opacity-0 group-hover:opacity-100 group-[:has(.dots:hover)]:opacity-0 group-[:has(.dots:hover)]:scale-98 bg-neutral-700/40' />
      <a
        href={`/watch?v=${id}`}
        class='videoCard h-fit w-full xs:not-sm:w-[max(80%,var(--breakpoint-xs))] sm:not-md:w-[min(100%,500px)] cursor-pointer items-start flex flex-col xs:rounded-xl transition-colors not-xs:active:bg-neutral-700/40 not-xs:group-[:has(.dots:hover)]:bg-transparent'
        onClick={changeVideo}
        title={title}
      >
        <section class='w-full aspect-video bg-black xs:rounded-xl flex items-end justify-center relative overflow-hidden'>
          <div class='h-full w-full bg-neutral-700 relative'>
            { thumbnailsById[min_thumbnail] &&
              <img
                src={thumbnailsById[min_thumbnail].url}
                class='h-full w-full object-cover [.isSquare]:object-contain flex pointer-events-none select-none blur transition-opacity'
                aria-hidden
                onLoad={handleLoadThumbnail}
              />
            }
            { thumbnailsById[max_thumbnail] &&
              <img
                src={thumbnailsById[max_thumbnail].url}
                class='opacity-0 absolute left-0 top-0 h-full w-full object-cover [.isSquare]:object-contain flex pointer-events-none select-none transition-opacity'
                alt={title}
                onLoad={handleLoadThumbnail}
              />
            }
          </div>
          <time class='absolute bottom-2 right-2 bg-[#000a] rounded font-semibold text-xs px-1 py-[2px]'>{parseDuration(duration)}</time>
          <div class='w-full h-1 absolute bottom-0 bg-[#666a]' hidden/* ={userVideoInfo?.timeSeen} */>
            <div class='bg-[#DC2626] h-full rounded-full' style={{
              width: /* userVideoInfo?.timeSeen ? `calc(100%/(${duration}/${userVideoInfo.timeSeen}))` :  */ '0px'
            }} />
          </div>
        </section>
        <section class='w-full h-20 xs:h-24 text-sm relative grid grid-cols-[48px_1fr_36px] not-xs:px-3 pt-3'>
          <div class='h-full w-full flex items-start justify-start'>
            <button
              class='h-fit w-fit aspect-square flex items-center justify-start pointer-events-auto cursor-pointer'
              // onClick={() => {
              //   navigate('/channel?id=ooo0eve0ooo')
              // }}
            >
              <div class='size-9 aspect-square object-contain max-h-full max-w-full rounded-full overflow-hidden bg-neutral-700'>
                {/* { video?.uploader_id && <img
                    src={`http://localhost:1234/avatar/${uploader_id}`} alt={'a'}
                    class='size-full'
                  />
                } */}
              </div>
            </button>
          </div>
          <div class='flex-1 text-neutral-400 flex flex-col items-start'>
            <h1 class='text-sm sm:text-base font-medium text-start line-clamp-2 text-neutral-100'>{title}</h1>
            <div class='text-[min(3.4vw,14px)] ms:block'>
              <span>mAngo</span>
              &nbsp;<span>•</span>&nbsp;
              <span>{parseViews(0)} vistas</span>
              &nbsp;<span>•</span>&nbsp;
              <span>hace {parseReleaseTimestamp(video.release_timestamp)}</span>
            </div>
          </div>
          <div title='' class='h-full w-full flex-1'>
            <button
              class='dots cursor-pointer rounded-full aspect-square size-9 flex items-center justify-center transition-colors not-mobile:hover:bg-neutral-700/70 pointer-coarse:active:bg-neutral-700/70'
              onClick={showOptions}
            >
              <div class='size-5 overflow-hidden flex items-center justify-center pointer-events-none'>
                <IconDots />
              </div>
            </button>
          </div>
        </section>
      </a>
    </article>
  )
}
