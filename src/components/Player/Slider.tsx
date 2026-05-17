import { usePlayerSlider } from '@/hooks/usePlayerSlider'
import { useRef } from 'preact/hooks'

interface Props {
  id: string
  class?: string
}

export function Slider ({ id, class: className }: Props) {
  const sliderRef = useRef<HTMLDivElement>(null)
  usePlayerSlider({ instanceId: id, sliderRef })
  
  return (
    <div
      id={id}
      ref={sliderRef}
      data-slider-id={`${id}:slider`}
      class={`${className} group flex items-center justify-center w-full h-5 px-3 cursor-pointer`}
    >
      <div data-slider-id={`${id}:container`} class='relative h-1 w-full'>
        {/* track */}
        <div
          data-slider-id={`${id}:track`}
          class='relative h-1 w-full rounded-full overflow-hidden bg-neutral-700'
        >
          {/* loaded */}
          {/* <div data-slider-id={`${id}:track`} class='hidden' /> */}

          {/* progress */}
          <div
            data-slider-id={`${id}:progress`}
            class='absolute left-0 top-1/2 -translate-y-1/2 h-full w-0 bg-linear-to-r from-gradient-start to-gradient-end'
          />
        </div>

        {/* thumb */}
        <div
          data-slider-id={`${id}:thumb`}
          class='absolute -left-2 top-1/2 -translate-y-1/2 size-4 group-hover:transform-[scale(125%)] transition-[transform] rounded-full bg-gradient-start shadow-[0px_0px_4px_0px_black]'
        />
      </div>
    </div>
  )
}
