import type { TargetedEvent } from 'preact'
import { useRef } from 'preact/hooks'
import { IconMagicFeed } from '../Icons'
import { v4 as uuidv4 } from 'uuid'

const TAG_FILTERS = {
  ALL: 'all',
  MUSIC: 'music',
  PROGRAMMING: 'programming'
}

const tags = [
  { name: 'Todos', filter: TAG_FILTERS.ALL },
  { name: 'Música', filter: TAG_FILTERS.MUSIC },
  { name: 'Programación', filter: TAG_FILTERS.PROGRAMMING }
]

export function HomeNav () {
  const tagsWrapperRef = useRef<HTMLDivElement>(null)
  // const videosList = useVideosListStore((state) => state.videosList)
  
  function handleChange (event: TargetedEvent<HTMLInputElement>) {
    // De alguna forma lo de abajo funciona perfecto ._.
    const { currentTarget: input } = event
    const toCheck = input.checked
    if (!tagsWrapperRef.current) return
    [...tagsWrapperRef.current.children].forEach(label => {
      if (label.children[0] instanceof HTMLInputElement)
        label.children[0].checked = false
    })
    const filter = input.getAttribute('data-filter')
    input.checked = true
    if (toCheck && filter !== TAG_FILTERS.ALL) return
    if (filter !== TAG_FILTERS.ALL) {
      input.checked = false
      if (tagsWrapperRef.current.children[0].children[0] instanceof HTMLInputElement) {
        tagsWrapperRef.current.children[0].children[0].checked = true
      }
    }
  }
  
  return (
    <nav
      id='homeNav'
      class='fixed z-90 right-0 top-14 flex items-end h-10 xs:h-14 min-h-fit w-full sm:w-[calc(100%-72px)] menu-open:w-navbar py-2 px-4 sm:px-6 bg-base-dark transition-all'
    >
      <div class='max-w-full w-full gap-3 flex items-center h-8 xs:h-9 overflow-x-auto [scrollbar-width:none] xs:py-0.5'>
        <button class='h-full min-w-fit flex items-center justify-center cursor-pointer px-3.5 xs:px-3 bg-neutral-700 xs:rounded-lg rounded-md focus-visible:outline-0'>
          <div class='size-5 xs:size-6 flex items-center justify-center overflow-hidden'>
            <IconMagicFeed />
          </div>
        </button>
        <div ref={tagsWrapperRef} class='flex items-center gap-3 h-full w-fit min-w-fit'>
          {
            tags.map(tag => (
              <label
                key={uuidv4()}
                class='w-fit min-w-fit h-full xs:px-3.5 px-3 bg-neutral-700 xs:rounded-lg rounded-md flex [&:has(:checked)]:bg-[#f1f1f1] [&:has(:checked)]:text-neutral-800 cursor-pointer [&:has(:checked):hover]:bg-white [&:not(:has(:checked)):hover]:bg-neutral-600 transition-colors'
              >
                <input
                  name={uuidv4()}
                  type='checkbox'
                  defaultChecked={tag.filter === TAG_FILTERS.ALL}
                  hidden
                  class='peer'
                  data-filter={tag.filter}
                  onChange={handleChange}
                />
                <span class='flex flex-nowrap min-w-fit h-full w-fit text-nowrap items-center justify-center text-sm font-semibold opacity-95 peer-checked:font-bold'>
                  {tag.name}
                </span>
              </label>
            ))
          }
        </div>
      </div>
    </nav>
  )
}
