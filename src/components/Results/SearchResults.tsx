import type { Video } from '@/types/videoTypes'
import { ResultCard } from './ResultCard'
import { useEffect, useState } from 'preact/hooks'
import { search } from '@/services/searchService'

export function SearchResults () {
  const [results, setResults] = useState<Video[]>([])
  
  async function loadVideos () {
    const searchParams = new URL(window.location.href)
    const query = searchParams.searchParams.get('search') ?? ''

    let videos: Video[] = []
    
    try {
      videos = await search(query)
    } catch (err) {
      console.error(`Error buscando "${query}" |`, err)
    }

    setResults(videos)
  }
  
  useEffect(() => {
    loadVideos()
  }, [])
  
  return (
    <section class='absolute top-17 right-0 flex flex-col gap-4 h-[calc(100%-112px)] min-h-fit w-full sm:w-[calc(100%-72px)] ml:menu-open:w-navbar pb-6 px-6 [transition:width_250ms_ease]'>
      { results.length
        ? results.map((v) => <ResultCard key={`search-result-card:${v.id}`} video={v} />)
        : 'No se encontraron resultados para la búsqueda'
      }
    </section>
  )
}
