import { usePlayerStore } from '@/stores/usePlayerStore'
import { Resolution } from './Resolution'
import { Icon } from '@/components/Icon'
import { IconChevronDown } from '@/components/Icons'
import { AUDIO_ONLY_RESOLUTION } from '@/lib/constants'
import { useEffect, useMemo } from 'preact/hooks'

const fps = [24, 30, 60, 120]

export function ResolutionsPanel ({ closePanel }: { closePanel: () => void }) {
  const video = usePlayerStore((state) => state.video)
  const lowestResolution = useMemo(() =>
    video?.resolutions.find((r) => r.id === video.min_resolution),
    [video?.resolutions]
  )
  const currentResolution = video?.resolutions[0]

  useEffect(() => {
    console.log(video?.resolutions.map((r) => r.id), video?.min_resolution)
  }, [video])

  return (
    <div class='w-60 h-fit p-3 overflow-y-auto gutter-stable [scrollbar-width:thin]'>
      <div class='flex flex-1 items-center gap-2 w-full h-fit pb-2 mb-2 border-b border-neutral-700'>
        <div class='h-8 w-fit flex-1'>
          <button
            class='size-8 aspect-square rounded-lg cursor-pointer transition-colors hover:bg-white/20'
            onClick={closePanel}
            >
            <Icon class='rotate-90'>
              <IconChevronDown />
            </Icon>
          </button>
        </div>
        <h1 class='flex-1 flex w-fit h-full align-text-bottom pt-px font-bold'>Resoluciones</h1>
        <div class='flex-1'></div>
      </div>
      <section class='w-full h-fit grid grid-cols-[13fr_7fr] gap-2'>
        <div class='w-full h-fit'>
          <Resolution resolution={lowestResolution}>
            Solo Audio
          </Resolution>
          { video?.resolutions.map((res) => (res.id !== AUDIO_ONLY_RESOLUTION) && (
            <Resolution key={`video-resolution:${res.id}`} resolution={res}>
              {res.id}
            </Resolution>
          )) }
        </div>
        <div class='flex flex-col'>
          { fps.map((value) => (
            <button
              key={`video-fps:${value}`}
              class='w-full h-10 rounded-md not-disabled:cursor-pointer transition-colors disabled:text-neutral-500 not-disabled:hover:bg-neutral-700/70'
              // onClick={changeFps}
              disabled={!currentResolution || currentResolution.fps !== value}
            >
              {value} FPS
            </button>
          )) }
        </div>
      </section>
    </div>
  )
}
