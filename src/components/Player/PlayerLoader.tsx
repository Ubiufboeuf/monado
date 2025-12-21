import { LoaderSpinner } from '../LoaderSpinner'

export function PlayerLoader () {
  return (
    <dialog class='absolute left-1/2 top-1/2 -translate-1/2 h-full w-full flex items-center justify-center outline-0 pointer-events-none bg-transparent'>
      <LoaderSpinner />
    </dialog>
  )
}
