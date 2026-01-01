import type { Video } from '@/types/videoTypes'
import { ResultCard } from './ResultCard'
import { v4 as uuidv4 } from 'uuid'

export function SearchResults ({ results }: { results: Video[] }) {
  return (
    <section class='absolute top-17 right-0 flex flex-col gap-4 h-[calc(100%-112px)] min-h-fit w-full sm:w-[calc(100%-72px)] ml:menu-open:w-navbar pb-6 px-6 [transition:width_250ms_ease]'>
      { results.map((v) => (
        <ResultCard key={uuidv4()} video={v} />
      )) }
    </section>
  )
}
