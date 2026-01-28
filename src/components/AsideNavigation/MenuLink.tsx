import { type ReactNode } from 'preact/compat'

export const MenuLink = ({ name, link, path, isMenuOpen, onClick, children }: { name: string, link: string, path: string, isMenuOpen?: boolean, onClick?: () => void, children: ReactNode }) => {  
  return (
    <a
      href={link}
      onClick={onClick}
      class={`${link === path ? 'actualPath bg-selected font-medium' : 'hover:bg-neutral-800'} flex flex-1 items-center gap-4 h-10 min-h-10 px-3 rounded-lg cursor-pointer active:bg-neutral-600 active:transition-colors`}
      tabIndex={isMenuOpen ? 0 : -1}
    >
      <div class='h-6 aspect-square'>
        {children}
      </div>
      <span class='text-sm text-nowrap overflow-ellipsis'>{name}</span>
    </a>
  )
}
