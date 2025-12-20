import { parseDuration } from '@/lib/parsers'
import { Icon } from '../Icon'
import { IconNext, IconPause, IconPlay, IconVolume } from '../Icons'
import { usePlayerStore } from '@/stores/usePlayerStore'
import { CustomRange } from './CustomRange'
import type { RefObject } from 'preact'

interface ControlsPanelProps {
  videoRef: RefObject<HTMLVideoElement>
}

export function ControlsBottomPanel ({ videoRef }: ControlsPanelProps) {
  const video = usePlayerStore((state) => state.video)
  const togglePlayState = usePlayerStore((state) => state.togglePlayState)
  const isPlaying = usePlayerStore((state) => state.isPlaying)
  const currentTime = usePlayerStore((state) => state.currentTime)
  const volume = usePlayerStore((state) => state.volume)

  function handleVolumeUpdate (volume: number) {
    if (videoRef.current) videoRef.current.volume = volume
  }

  return (
    <div class='flex h-13 justify-between px-1 gap-2'>
      <section class='flex items-center gap-2'>
        <button
          class='group flex items-center justify-center size-10 p-1 rounded-full overflow-hidden cursor-pointer transition-colors bg-black/30 outline-0 border-2 border-transparent focus-within:border-focus'
          onClick={togglePlayState}
        >
          <div class='flex items-center justify-center size-full rounded-full pointer-events-none transition-colors group-hover:bg-white/10'>
            { isPlaying
              ? <Icon class='size-8 shrink-0 filter-[drop-shadow(0px_0px_1px_black)]'>
                  <IconPause />
                </Icon>
              : <Icon class='size-10 shrink-0 filter-[drop-shadow(0px_0px_1px_black)]'>
                  <IconPlay />
                </Icon>
            }
          </div>
        </button>
        <div class='flex items-center justify-center h-10 w-fit rounded-full bg-black/30'>
          <button class='group flex items-center justify-center h-full w-13 p-1 rounded-full overflow-hidden cursor-pointer transition-colors outline-0 border-2 border-transparent focus-within:border-focus'>
            <div class='flex items-center justify-center size-full rounded-full transition-colors group-hover:bg-white/10'>
              <Icon class='size-10 shrink-0 filter-[drop-shadow(0px_0px_1px_black)] rotate-180'>
                <IconNext />
              </Icon>
            </div>
          </button>
          <button class='group flex items-center justify-center h-full w-13 p-1 rounded-full overflow-hidden cursor-pointer transition-colors outline-0 border-2 border-transparent focus-within:border-focus'>
            <div class='flex items-center justify-center size-full rounded-full transition-colors group-hover:bg-white/10'>
              <Icon class='size-10 shrink-0 filter-[drop-shadow(0px_0px_1px_black)]'>
                <IconNext />
              </Icon>
            </div>
          </button>
        </div>
        <div class='group relative flex items-center justify-center h-10 w-fit rounded-full bg-black/30'>
          <div class='absolute w-full h-full left-0 top-0 p-1'>
            <div class='w-full h-full rounded-full group-hover:bg-white/10' />
          </div>
          <button class='flex items-center justify-center h-full w-10 mx-1 rounded-full outline-0 border-2 overflow-hidden cursor-pointer transition-colors border-transparent focus-within:border-focus'>
            <div class='flex items-center justify-center size-8 rounded-full transition-colors'>
              <Icon class='size-8 shrink-0 filter-[drop-shadow(0px_0px_1px_black)]'>
                <IconVolume />
              </Icon>
            </div>
          </button>
          <div class='h-full w-0 group-hover:w-fit focus-within:w-fit group-hover:pr-5 focus-within:pr-5 overflow-hidden transition-[width,padding] [interpolate-size:allow-keywords] duration-350 group-hover:duration-250 outline-0 border border-transparent focus-within:border-focus'>
            {/* volumen */}
            <CustomRange
              id='volume'
              listenForProgress={volume ?? 0}
              maxValue={1}
              onValueUpdate={handleVolumeUpdate}
              rangeClass='relative w-12 mx-1 ml-1.5 h-full flex items-center cursor-pointer outline-0'
              trackClass='w-full h-0.5 rounded-full'
              progressClass='absolute w-0 h-0.5 rounded-full filter-[drop-shadow(0px_0px_1px_black)] bg-white'
              thumbClass='absolute left-0 -translate-x-1/2 size-3 rounded-full filter-[drop-shadow(0px_0px_1px_black)] bg-white'
            />
          </div>
        </div>
        <div class='flex items-center justify-center h-10 w-fit p-1 rounded-full bg-black/30'>
          <div class='flex items-center justify-center h-full w-full px-3 rounded-full text-sm'>
            <span>{parseDuration(currentTime)}</span>
            &nbsp;<span class='text-sm'>/</span>&nbsp;
            <span>{parseDuration(video?.duration ?? 0)}</span>
          </div>
        </div>
      </section>
    </div>
  )
}
