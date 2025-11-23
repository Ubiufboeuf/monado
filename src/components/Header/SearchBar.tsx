import type { TargetedEvent } from 'preact'
import { useEffect, useRef } from 'preact/compat'
import { IconMic, IconSearch, IconClose } from '@/components/Icons'

export function SearchBar () {
  const searchValueRef = useRef('')
  const inputRef = useRef<HTMLInputElement>(null)
  const clearInputRef = useRef<HTMLButtonElement>(null)
  const paramSearchRef = useRef('')

  function updateSearch (newValue?: string | null) {
    const value = newValue ?? ''
    if (inputRef.current && inputRef.current.value !== value) {
      inputRef.current.value = value
    }
    searchValueRef.current = value
    checkVisibility(value)
  }

  function handleInput (event: TargetedEvent<HTMLInputElement>) {
    if (!event.currentTarget) return
    const { value } = event.currentTarget
    updateSearch(value)
  }

  function checkVisibility (value: string) {
    if (clearInputRef.current) {
      clearInputRef.current.hidden = value ? !value : !searchValueRef.current
    }
  }

  function clearInput (event: TargetedEvent<HTMLButtonElement>) {
    event.preventDefault()
    if (inputRef.current) {
      inputRef.current.value = ''
      searchValueRef.current = ''
      inputRef.current.focus()
      checkVisibility('')
    }
  }

  function handleSubmit (event: TargetedEvent<HTMLFormElement>) {
    event.preventDefault()
    const params = new URLSearchParams(location?.search)
    paramSearchRef!.current = params.get('search') ?? ''
    if (paramSearchRef.current === searchValueRef.current || !searchValueRef.current) return
    location.href = `/results?search=${encodeURIComponent(searchValueRef.current)}`
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const search = params.get('search')
    if (search?.trim() === '' || search == null) {
      return
    }
    updateSearch(encodeURIComponent(search))
  }, [])

  return (
    <section class='sm:flex hidden flex-1 items-center h-full justify-center min-w-fit max-w-full w-full gap-4'>
      <div class='flex w-full max-w-xl relative h-10'>
        <form
          class='h-full max-w-full w-full rounded-full border border-neutral-700/70 bg-base text-white align-middle focus-within:border-focus focus:outline-0 cursor-text flex items-center justify-between relative hover:transition-colors [&:focus-within>#searchIconLeft]:flex'
          onSubmit={handleSubmit}
        >
          <div class='h-full aspect-[1.4/1] flex items-center justify-center'>
            <div class='size-6 flex items-center justify-center text-white/50'>
              <IconSearch />
            </div>
          </div>
          <input
            ref={inputRef}
            id='search-bar'
            placeholder='Buscar'
            autoComplete='off'
            class='h-full w-full max-w-full px-1 bg-transparent focus:outline-0 placeholder:text-neutral-500 placeholder:select-none'
            onInput={handleInput}
          />
          <button
            ref={clearInputRef}
            id='clear-input-btn'
            class='h-full hover:bg-neutral-700/70 cursor-pointer transition-colors flex items-center justify-center rounded-full aspect-square'
            onClick={clearInput}
            hidden
          >
            <div class='size-6 flex items-center justify-center text-white/50'>
              <IconClose />
            </div>
          </button>
          <button id='search-by-voice' class='rounded-full h-full cursor-pointer hover:bg-neutral-700/70 transition-colors aspect-[1.4/1] flex items-center justify-center'>
            <div class='size-6 flex items-center justify-center text-white/50'>
              <IconMic />
            </div>
          </button>
        </form>
      </div>
    </section>
  )
}
