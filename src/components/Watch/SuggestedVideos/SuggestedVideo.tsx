import { VideoCard } from '@/components/VideoCard'
import { VideoListCard } from '@/components/VideoListCard'
import type { Video } from '@/types/videoTypes'

export function SuggestedVideo ({ video, isMobile }: { video: Video, isMobile?: boolean }) {
  return isMobile
    ? <VideoCard video={video} />
    : <VideoListCard video={video} />
}
