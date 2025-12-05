import type { Video } from '@/types/videoTypes'
import type { TargetedEvent, TargetedMouseEvent } from 'preact'
import { IconDots, IconVerified } from './Icons'
import { parseDuration, parseViews } from '@/lib/parsers'
import { navigate } from 'astro:transitions/client'
import { useState } from 'preact/hooks'

export function VideoCard ({ video }: { video: Video }) {
  const { id, title, duration, thumbnailsById, min_thumbnail, max_thumbnail } = video
  const [isSquare, setIsSquare] = useState(false)

  function changeVideo (event: TargetedMouseEvent<HTMLElement>) {
    event.preventDefault()
    
    navigate(`/watch?v=${video.id}`)
  }

  function showOptions (event: TargetedMouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    event.stopPropagation()

    console.log('show options')
  }

  function handleLoadThumbnail (event: TargetedEvent<HTMLImageElement>) {
    const image = event.currentTarget
    const { naturalWidth, naturalHeight } = image
    const aspectRatio = naturalWidth / naturalHeight

    const threshold = 0.1
    setIsSquare(((aspectRatio + threshold) <= 1.1) && ((aspectRatio - threshold) >= 0.9))

    // Para evitar un "parpadeo" por el object fit inicial incorrecto
    image.classList.remove('opacity-0')
  }
  
  return (
    <article class='cardWrapper relative flex justify-center'>
      <a
        href={`/watch?v=${id}`}
        class='videoCard h-fit w-full xs:not-sm:w-[max(80%,var(--breakpoint-xs))] sm:not-md:w-[min(100%,500px)] cursor-pointer items-start flex flex-col focus:outline-0 [&:not(:has(.dots:active)):active]:bg-neutral-600/20 rounded-xl transition-colors active:duration-200'
        onClick={changeVideo}
        title={title}
      >
        <section class='w-full aspect-video bg-black xs:rounded-xl flex items-end justify-center relative overflow-hidden'>
          <div class='h-full w-full bg-neutral-700 relative'>
            { thumbnailsById[min_thumbnail] &&
              <img
                src={thumbnailsById[min_thumbnail].url}
                class={`${isSquare ? 'isSquare' : ''} opacity-0 h-full w-full object-cover [.isSquare]:object-contain flex pointer-events-none select-none blur`}
                onLoad={handleLoadThumbnail}
              />
            }
            { thumbnailsById[max_thumbnail] &&
              <img
                src={thumbnailsById[max_thumbnail].url}
                class={`${isSquare ? 'isSquare' : ''} opacity-0 absolute left-0 top-0 h-full w-full object-cover [.isSquare]:object-contain flex pointer-events-none select-none`}
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
        <section class='w-full h-26 ms:h-29 text-sm relative grid grid-cols-[48px_1fr_36px] not-xs:px-3 pt-3'>
          <div class='h-fulll w-full flex items-start justify-start'>
            <button
              class='size-10 aspect-square flex items-center justify-start pointer-events-auto cursor-pointer'
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
            <div class='text-[min(3vw,14px)] ms:block flex items-center gap-1'>
              <span>mAngo</span>
              &nbsp;<span>•</span>&nbsp;
              <span>{parseViews(0)} vistas</span>
              &nbsp;<span>•</span>&nbsp;
              <span>hace 20 días</span>
            </div>
          </div>
          <div class='h-full w-full flex-1'>
            <button
              class='dots hover:bg-neutral-800 cursor-pointer rounded-full aspect-square size-9 flex items-center justify-center'
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
