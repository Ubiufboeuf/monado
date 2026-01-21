import type { Video } from '@/types/videoTypes'
import { v4 as uuidv4 } from 'uuid'
import { VideoCard } from '../VideoCard'

export function HomeVideos ({ videos }: { videos: Video[] }) {
  return (
    <div class='grid justify-center items-start gap-4 grid-cols-[repeat(auto-fill,minmax(312px,1fr))] h-fit w-full max-h-fit max-w-full overflow-x-hidden sm:px-6 sm:pt-3 not-desktop:pb-tbh'>
      { videos.map((video) => <VideoCard key={uuidv4()} video={video} />) }
    </div>
  )
}
