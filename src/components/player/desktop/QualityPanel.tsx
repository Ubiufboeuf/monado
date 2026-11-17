import { Icon } from '@/components/ui/Icon'
import { IconCheck } from '@/components/ui/Icons'
import { usePlayerStore } from '@/stores/usePlayerStore'
import { useEffect, useRef, useState, type Dispatch, type StateUpdater } from 'preact/hooks'
import type shaka from 'shaka-player'

interface Props {
  isOpen: boolean
  setIsOpen: Dispatch<StateUpdater<boolean>>
}

export function QualityPanel ({ isOpen, setIsOpen }: Props) {
  const panelRef = useRef<HTMLDivElement>(null)
  const player = usePlayerStore((state) => state.player)
  const [qualities, setQualities] = useState<shaka.extern.VideoTrack[]>([])
  const [currentQuality, setCurrentQuality] = useState<number>()

  function changeResolution (height: number | null) {
    if (!height) return

    const track = player?.getVideoTracks().find((t) => t.height === height)
    if (!track) return

    try {
      player?.selectVideoTrack(track, true)
      setCurrentQuality(height)
    } catch {/* empty */}
  }

  function closePanel (event: PointerEvent) {
    const panel = panelRef.current
    if (!isOpen || event.target !== panel) return
    setIsOpen(false)
  }

  useEffect(() => {
    window.addEventListener('click', closePanel)

    return () => window.removeEventListener('click', closePanel)
  }, [])
  
  useEffect(() => {
    if (!player) return

    function updateQualities () {
      const tracks = player!.getVideoTracks()
      setQualities(tracks.toReversed())
      setCurrentQuality(tracks[0]?.height ?? undefined)
    }

    updateQualities()

    player.addEventListener('trackschanged', updateQualities)

    return () => {
      player.removeEventListener('trackschanged', updateQualities)
    }
  }, [player])

  useEffect(() => {
    if (!currentQuality) return
    // setIsOpen(false)
  }, [currentQuality])

  return (
    <div ref={panelRef} class='absolute z-2 right-3 bottom-14 flex flex-col pb-2 h-fit w-52 rounded-lg overflow-hidden bg-base-dark' hidden={!isOpen}>
      <div class='flex items-center gap-4 p-3 px-4 border-b border-b-neutral-600/60 uppercase tracking-wider mb-2'>
        <span class='text-neutral-400 text-xs'>Resoluciones</span>
      </div>
      { qualities.map(({ height, label }) => (
        <button
          key={height}
          class='w-full h-fit flex justify-start items-center gap-4 p-2 px-4 transition-colors shr:bg-neutral-800 cursor-pointer'
          onClick={() => changeResolution(height)}
        >
          <div class='size-6'>
          <Icon hidden={height !== currentQuality}>
            <IconCheck />
          </Icon>
          </div>
          <span class='font-semibold'>{label || `${height}p`}</span>
        </button>
      )) }
    </div>
  )
}
