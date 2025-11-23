import type { ReactNode } from 'preact/compat'

export const MenuLink = ({ name, link, path, children }: { name: string, link: string, path: string, children: ReactNode }) => {
  return (
    <a
      href={link}
      class={`${link === path ? 'actualPath bg-selected font-medium' : 'hover:bg-neutral-800'} flex flex-1 items-center gap-4 h-10 min-h-10 px-3 rounded-lg cursor-pointer active:bg-neutral-600 active:transition-colors`}
    >
      <div class='h-6 aspect-square'>
        {children}
      </div>
      <span class='text-sm text-nowrap overflow-ellipsis overflow-hidden'>{name}</span>
    </a>
  )
}
