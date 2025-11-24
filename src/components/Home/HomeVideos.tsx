import type { Video } from '@/types/videoTypes'
import { v4 as uuidv4 } from 'uuid'
import { VideoCard } from '../VideoCard'

export function HomeVideos ({ videos }: { videos: Video[] }) {
  return (
    <div class='grid justify-center items-start ms:gap-4 grid-cols-[min(100%,500px)] ms:grid-cols-[repeat(auto-fill,minmax(312px,1fr))] h-fit w-full max-h-fit max-w-full pt-6 sm:p-6'>
      { videos.map((video) => <VideoCard key={uuidv4()} video={video} />) }
    </div>
  )
}
