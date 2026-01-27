import { useSearchStore } from '@/stores/useSearchStore'
import { useEffect, useRef, useState } from 'preact/hooks'
import { Icon } from '../Icon'
import { IconArrowLeft, IconClose, IconMic, IconSearch } from '../Icons'
import type { TargetedEvent } from 'preact'

export function SearchOverlay ({ searchQuery }: { searchQuery?: string }) {
  const initialValue = decodeURI(searchQuery ?? '')

  // const query = useSearchStore((state) => state.query)
  const setQuery = useSearchStore((state) => state.setQuery)
  const isMobileSearching = useSearchStore((state) => state.isMobileSearching)
  const setIsMobileSearching = useSearchStore((state) => state.setIsMobileSearching)
  
  const [isOverlayVisible, setIsOverlayVisible] = useState(false)
  const [lessThanXS, setLessThanXS] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const clearInputRef = useRef<HTMLButtonElement>(null)
  const searchByVoiceRef = useRef<HTMLButtonElement>(null)
  const searchRef = useRef<HTMLButtonElement>(null)

  function handleMQChange (ev: MediaQueryListEvent) {
    setLessThanXS(ev.matches)
  }

  function updateSearch (newValue?: string | null) {
    const search = newValue ?? ''
    if (inputRef.current && inputRef.current.value !== search) {
      inputRef.current.value = search
    }

    const encodedSearch = encodeURI(search)

    setQuery(encodedSearch)
    checkVisibility(search)
  }

  function checkVisibility (value: string) {
    if (clearInputRef.current) {
      const search = new URLSearchParams(location.href).get('search')
      clearInputRef.current.hidden = value ? !value : !search
    }

    const searchByVoice = searchByVoiceRef.current
    const search = searchRef.current
    if (searchByVoice && search) {
      searchByVoice.hidden = !!value
      search.hidden = !value
    }
  }

  function handleInput (event: TargetedEvent<HTMLInputElement>) {
    if (!event.currentTarget) return
    const { value } = event.currentTarget
    updateSearch(value)
  }

  function handleKeyDown (event: KeyboardEvent) {
    const key = event.key.toLowerCase()
    if (key === 'enter') {
      searchResults()
    }
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

  function searchResults () {
    const query = inputRef.current?.value
    if (!query || !query.trim()) return
    
    location.href = `/results?search=${encodeURI(query)}`
  }

  function closeSearchOverlay () {
    setIsMobileSearching(false)
  }
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(width < 412px)')
    setLessThanXS(mediaQuery.matches)

    mediaQuery.addEventListener('change', handleMQChange)

    return () => mediaQuery.removeEventListener('change', handleMQChange)
  }, [])
  
  useEffect(() => {
    if (isMobileSearching) inputRef.current?.focus()
  }, [isMobileSearching])
  
  useEffect(() => {
    const html = document.documentElement
    const usingTabBar = html.dataset.usingTabBar === 'true'

    setIsOverlayVisible(isMobileSearching && lessThanXS && usingTabBar)
  }, [isMobileSearching, lessThanXS])

  return (
    <section class={`${isOverlayVisible ? 'visible' : ''}
      fixed z-12 top-0 w-full h-14 p-2 px-4 opacity-100 transition-all transition-discrete
      not-[.visible]:opacity-0 not-[.visible]:pointer-events-none
    `}>
      <section
        id='search-bar-overlay'
        class='relative flex items-center justify-between h-full max-w-full w-full rounded-full border align-middle cursor-text focus:outline-0 transition-colors border-neutral-700/70 bg-base-dark text-white focus-within:border-focus hover:not-focus-within:border-neutral-600'
      >
        <button
          id='close-search-in-overlay'
          class='flex items-center justify-center h-full rounded-full aspect-[1.4/1] cursor-pointer transition-colors hover:bg-neutral-700/70'
          onClick={closeSearchOverlay}
        >
          <Icon class='size-6 text-[#878687]'>
            <IconArrowLeft />
          </Icon>
        </button>
        <input
          ref={inputRef}
          id='search-input-in-overlay'
          placeholder='Buscar'
          defaultValue={initialValue}
          autoComplete='off'
          class='h-full w-full max-w-full px-1 bg-transparent focus:outline-0 placeholder:text-neutral-500 placeholder:select-none'
          onInput={handleInput}
          onKeyDown={handleKeyDown}
        />
        <button
          ref={clearInputRef}
          id='clear-input-in-overlay'
          class='flex items-center justify-center h-full rounded-full aspect-square cursor-pointer transition-colors hover:bg-neutral-700/70'
          onClick={clearInput}
          hidden
        >
          <Icon class='size-6 text-white/50'>
            <IconClose />
          </Icon>
        </button>
        <button
          ref={searchByVoiceRef}
          id='search-by-voice-in-overlay'
          class='flex items-center justify-center h-full rounded-full aspect-[1.4/1] cursor-pointer transition-colors hover:bg-neutral-700/70'
        >
          <Icon class='size-6 text-white/50'>
            <IconMic />
          </Icon>
        </button>
        <button
          ref={searchRef}
          id='submit-search-in-overlay'
          class='flex items-center justify-center h-full rounded-full aspect-[1.4/1] cursor-pointer transition-colors hover:bg-neutral-700/70'
          onClick={searchResults}
          hidden
        >
          <Icon class='size-6 text-white/50'>
            <IconSearch />
          </Icon>
        </button>
      </section>
    </section>
  )
}
