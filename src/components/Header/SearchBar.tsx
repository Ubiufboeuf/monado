import type { TargetedEvent } from 'preact'
import { useEffect, useRef } from 'preact/compat'
import { IconMic, IconSearch, IconClose } from '@/components/Icons'
import { Icon } from '../Icon'
import { useSearchStore } from '@/stores/useSearchStore'

export function SearchBar ({ search }: { search: string | undefined }) {
  const query = useSearchStore((state) => state.query)
  const setQuery = useSearchStore((state) => state.setQuery)
  
  const inputRef = useRef<HTMLInputElement>(null)
  const clearInputRef = useRef<HTMLButtonElement>(null)

  function handleInput (event: TargetedEvent<HTMLInputElement>) {
    if (!event.currentTarget) return
    const { value } = event.currentTarget
    updateSearch(value)
  }

  function updateSearch (newValue?: string | null) {
    const value = newValue ?? ''
    if (inputRef.current && inputRef.current.value !== value) {
      inputRef.current.value = value
    }
    setQuery(value)
    checkVisibility(value)
  }

  function checkVisibility (value: string) {
    if (clearInputRef.current) {
      clearInputRef.current.hidden = value ? !value : !query
    }
  }

  function handleKeyDown (event: KeyboardEvent) {
    const key = event.key.toLowerCase()
    if (key === 'enter') {
      searchResults()
    }
  }

  function searchResults () {
    const query = inputRef.current?.value
    if (!query) return
    
    location.href = `/results?search=${encodeURI(query)}`
  }

  function clearInput (event: TargetedEvent<HTMLButtonElement>) {
    event.preventDefault()
    if (inputRef.current) {
      inputRef.current.value = ''
      setQuery('')
      inputRef.current.focus()
      checkVisibility('')
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const search = params.get('search')
    if (search?.trim() === '' || search == null) {
      return
    }
    updateSearch(encodeURI(search))
  }, [])

  return (
    <section class='hidden md:flex flex-1 items-center justify-center gap-4 h-full w-full min-w-fit max-w-full'>
      <div class='relative flex h-10 w-full max-w-xl'>
        <section
          id='search-bar'
          class='relative flex items-center justify-between h-full max-w-full w-full rounded-full border align-middle cursor-text focus:outline-0 transition-colors border-neutral-700/70 bg-base-dark text-white focus-within:border-focus'
        >
          <div class='flex items-center justify-center h-full aspect-[1.4/1]'>
            <Icon class='size-6 text-white/50'>
              <IconSearch />
            </Icon>
          </div>
          <input
            ref={inputRef}
            id='search-bar'
            placeholder='Buscar'
            defaultValue={search}
            autoComplete='off'
            class='h-full w-full max-w-full px-1 bg-transparent focus:outline-0 placeholder:text-neutral-500 placeholder:select-none'
            onInput={handleInput}
            onKeyDown={handleKeyDown}
          />
          <button
            ref={clearInputRef}
            id='clear-input-btn'
            class='flex items-center justify-center h-full rounded-full aspect-square cursor-pointer transition-colors hover:bg-neutral-700/70'
            onClick={clearInput}
            hidden
          >
            <Icon class='size-6 text-white/50'>
              <IconClose />
            </Icon>
          </button>
          <button
            id='search-by-voice'
            class='flex items-center justify-center h-full rounded-full aspect-[1.4/1] cursor-pointer transition-colors hover:bg-neutral-700/70'
          >
            <Icon class='size-6 text-white/50'>
              <IconMic />
            </Icon>
          </button>
        </section>
      </div>
    </section>
  )
}
