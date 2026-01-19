import type { ItemAside, MenuSubItem } from '@/types/env'
import type { RefObject, TargetedEvent } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { IconArrowDown, IconHome } from '../Icons'
import { Icon } from '../Icon'

const checkboxName = 'checkbox-menu-items'

export function MenuExpandableLink ({ item: { Icon: IconItem, name, path }, path: pathname, asideMenuRef, isMenuOpen }: { item: ItemAside, path: string, asideMenuRef: RefObject<HTMLElement | null>, isMenuOpen?: boolean }) {
  const [subItems, setSubItems] = useState<MenuSubItem[]>()
  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    getSubItems(name)
  }, [])

  function getSubItems (name: string) {
    setSubItems([
      { name, link: '#1', Icon: ({ active = false }: { active?: boolean }) => <IconHome active={active} /> },
      { name, link: '#2', Icon: ({ active = false }: { active?: boolean }) => <IconHome active={active} /> },
      { name, link: '#3', Icon: ({ active = false }: { active?: boolean }) => <IconHome active={active} /> },
      { name, link: '#4', Icon: ({ active = false }: { active?: boolean }) => <IconHome active={active} /> },
      { name, link: '#5', Icon: ({ active = false }: { active?: boolean }) => <IconHome active={active} /> }
    ])
  }

  function handleInput (event: TargetedEvent<HTMLInputElement>) {
    const { currentTarget: input } = event
    const savedCheck = input?.checked
    if (asideMenuRef.current) {
      const links = asideMenuRef.current.querySelectorAll('.expandableLink')
      links.forEach(link => {
        const checkbox = link.querySelector(`input[name='${checkboxName}']`)
        if (checkbox instanceof HTMLInputElement) {
          checkbox.checked = false
        }
      })
    }
    input.checked = savedCheck
    setIsChecked(input.checked)
  }

  return (
    <article class='expandableLink flex flex-col min-h-10'>
      <input
        id={`checkbox-menu-${name}`}
        type='checkbox'
        hidden
        name={checkboxName}
        class='peer'
        onInput={handleInput}
      />
      <div class='w-full h-10 flex justify-between gap-2 items-center peer-checked:[&>label>div]:rotate-180'>
        <a
          href={path}
          class={`${path === pathname ? 'actualPath bg-selected font-medium' : 'hover:bg-neutral-800'}
            flex-1 max-w-51 h-10 min-h-10 flex items-center gap-4 px-3 rounded-lg cursor-pointer active:bg-neutral-600`
          }
          tabIndex={isMenuOpen ? 0 : -1}
        >
          <Icon class='size-6 max-h-full aspect-square'>
            <IconItem active={path === pathname} />
          </Icon>
          <span>{name}</span>
        </a>
        <div class='w-[2px] h-7 bg-neutral-800'></div>
        <label htmlFor={`checkbox-menu-${name}`} class='group aspect-square flex items-center justify-center hover:bg-neutral-800 rounded-lg h-full cursor-pointer'>
          <Icon class='transition-all'>
            <IconArrowDown />
          </Icon>
        </label>
      </div>
      <div class='dropDown w-full rounded-lg [transition:height_250ms_ease] [interpolate-size:allow-keywords] h-0 peer-checked:h-fit overflow-hidden'>
        <div class={`${isChecked ? 'checked' : ''} sub-items-container hidden [&.checked]:flex flex-col h-fit w-full [transition:all_300ms_ease_allow-discrete]`}>
          {
            subItems?.map(sub => (
              <a key={`menu-subexp-item:${sub.link}`} href={sub.link} class='w-full h-10 flex items-center px-3 pl-6 gap-4 hover:bg-neutral-800 rounded-lg'>
                <Icon class='size-6 max-h-full aspect-square'>
                  { sub.Icon && <IconItem /> }
                </Icon>
                <span>{sub.name}</span>
              </a>
            ))
          }
        </div>
      </div>
    </article>
  )
}
