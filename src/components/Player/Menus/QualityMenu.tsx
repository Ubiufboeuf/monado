import { Icon } from '@/components/Icon'
import { IconCheck } from '@/components/Icons'
import { changeQuality } from '@/lib/player/playerActions'
import { usePlayerStore } from '@/stores/usePlayerStore'
import { useState } from 'preact/hooks'

export function QualityMenu () {
  const video = usePlayerStore((state) => state.video)
  if (!video) return 'Error, no se encontró el video'

  const [qualities] = useState(video.resolutions)
  const currentQuality = usePlayerStore((state) => state.currentQuality)

  const changeVideoQuality = (id: string) => () => changeQuality(id)

  return (
    <div class='h-fit w-40 flex flex-col p-2'>
      { qualities.map(({ id, height }) => (
        <button
          key={id}
          class={`${currentQuality === id ? 'current' : ''} group h-fit w-full flex items-center justify-between p-2 px-5 rounded-md cursor-pointer transition-colors text-neutral-400 hover:text-neutral-100 [.current]:text-neutral-100 hover:bg-neutral-800`}
          onClick={changeVideoQuality(id)}
        >
          <span>{height}p</span>
          <Icon class='h-full aspect-square hidden opacity-0 group-[.current]:flex group-[.current]:opacity-100 transition-all transition-discrete'>
            <IconCheck />
          </Icon>
        </button>
      )) }
    </div>
  )
}
