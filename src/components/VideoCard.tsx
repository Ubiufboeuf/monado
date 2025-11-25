import type { Video } from '@/types/videoTypes'
import type { TargetedMouseEvent } from 'preact'
import { IconDots } from './Icons'
import { parseDuration, parseViews } from '@/lib/parsers'

export function VideoCard ({ video }: { video: Video }) {
  const { id, title, duration, views, assets } = video
  
  function changeVideo (event: TargetedMouseEvent<HTMLElement>) {
    event.preventDefault()
    
    console.log('change video')
  }

  function showOptions (event: TargetedMouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    event.stopPropagation()

    console.log('show options')
  }
  
  return (
    <article className='cardWrapper relative'>
      <a
        href={`/watch?v=${id}`}
        className='videoCard h-fit w-full cursor-pointer items-start flex flex-col focus:outline-0 [&:not(:has(.dots:active)):active]:bg-neutral-600/20 rounded-xl transition-colors active:duration-200'
        onClick={changeVideo}
        title={title}
      >
        <section className='w-full aspect-video bg-black xs:rounded-xl flex items-end justify-center relative overflow-hidden'>
          <div className='h-full w-full bg-neutral-700 relative'>
            { assets.minThumbnail && <img className='h-full w-full object-contain flex pointer-events-none select-none blur' src={assets.minThumbnail} /> }
            { assets.thumbnail && <img className='absolute left-0 top-0 h-full w-full object-contain flex pointer-events-none select-none' src={assets.thumbnail} alt={title} /> }
          </div>
          <time className='absolute bottom-2 right-2 bg-[#000a] rounded font-semibold text-xs px-1 py-[2px]'>{parseDuration(duration)}</time>
          <div className='w-full h-1 absolute bottom-0 bg-[#666a]' hidden/* ={userVideoInfo?.timeSeen} */>
            <div className='bg-[#DC2626] h-full rounded-full' style={{
              width: /* userVideoInfo?.timeSeen ? `calc(100%/(${duration}/${userVideoInfo.timeSeen}))` :  */ '0px'
            }} />
          </div>
        </section>
        <section className='w-full h-26 ms:h-29 text-sm relative grid grid-cols-[48px_1fr_36px]'>
          <div />
          <div className='flex-1 text-neutral-400 pt-3 flex flex-col items-start not-ms:pl-3'>
            <h1 className='text-[min(3.2vw,16px)] font-medium text-start leading-[22px] line-clamp-2 text-neutral-100'>{title}</h1>
            <div className='text-[min(3vw,14px)] ms:block flex items-center gap-1'>
              {/* {
                creator?.name && (
                  <div className='flex items-center justify-start w-fit h-fit'>
                    <span className='pr-1.5'>{creator?.name}</span>
                    <span className='ms:hidden flex w-fit'>•</span>
                    <div className='size-[14px] hidden ms:block aspect-square fill-neutral-400'>{creator?.verified ? <IconChannelVerified /> : ''}</div>
                  </div>
                )
              } */}
              <span hidden={!views}>{parseViews(views)} vistas </span>
              {/* { parsedPublicationDate && (
                <>
                  <span>•</span>
                  <span> hace {parsedPublicationDate}</span>
                </>
              )} */}
            </div>
          </div>
          <div className='h-full w-full flex-1 pt-3'>
            <button
              className='dots absolute right-0 hover:bg-neutral-800 cursor-pointer rounded-full aspect-square size-9 flex items-center justify-center'
              onClick={showOptions}
            >
              <div className='size-5 overflow-hidden flex items-center justify-center pointer-events-none'>
                <IconDots />
              </div>
            </button>
          </div>
        </section>
      </a>
      <article
        className='absolute top-0 left-0 h-full w-full flex flex-col pointer-events-none'
        // title={uploader ?? ''}
      >
        <section className='w-full aspect-video rounded-xl' />
        <section className='w-full flex min-h-[116px] h-full pt-3 gap-2 flex-1 relative'>
          <button
            className='absolute top-0 ms:left-0 left-3 size-10 aspect-square flex items-center justify-start mt-3 pointer-events-auto cursor-pointer'
            // onClick={() => {
            //   navigate('/channel?id=ooo0eve0ooo')
            // }}
          >
            <div className='ms:size-9 xs:size-10 size-[min(40px,9vw)] aspect-square object-contain max-h-full max-w-full rounded-full overflow-hidden bg-neutral-700'>
              {/* { video?.uploader_id && <img
                  src={`http://localhost:1234/avatar/${uploader_id}`} alt={'a'}
                  className='size-full'
                />
              } */}
            </div>
          </button>
          <div className='flex-1 h-fit'>
            <div className='w-[90%] h-4 rounded mb-3' />
            <div className='w-[60%] h-4 rounded' />
          </div>
        </section>
      </article>
    </article>
  )
}
