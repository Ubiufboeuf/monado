import { BaseDrawer } from '@/components/Drawer'
import { Icon } from '@/components/ui/Icon'
import { IconCheck } from '@/components/ui/Icons'
import { usePlayerStore } from '@/stores/usePlayerStore'
import { useEffect, useState, type Dispatch, type StateUpdater } from 'preact/hooks'
import type shaka from 'shaka-player'

interface Props {
  isOpen: boolean
  setIsOpen: Dispatch<StateUpdater<boolean>>
}

export function QualityDrawer ({ isOpen, setIsOpen }: Props) {  
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
  
  useEffect(() => {
    if (!player) return

    function updateQualities () {
      const tracks = player!.getVideoTracks()
      setQualities(tracks)
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
    setIsOpen(false)
  }, [currentQuality])
  
  return (
    <BaseDrawer isOpen={isOpen} setIsOpen={setIsOpen} contentClass='h-full w-full'>
      <div class='flex flex-col w-full h-full'>
        { qualities.map(({ height, label }) => (
          <button
            key={height}
            class='w-full h-fit flex justify-start items-center gap-6 p-4 px-6 transition-colors shr:bg-neutral-800'
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
    </BaseDrawer>
  )
}
