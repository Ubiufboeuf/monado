import type { ItemAside, MenuSubItem } from '@/types/env'
import type { RefObject, TargetedEvent } from 'preact'
import { useEffect, useId, useState } from 'preact/hooks'
import { IconArrowDown, IconHome } from '../Icons'
import { Icon } from '../Icon'

export function MenuExpandableLink ({ item: { Icon: IconItem, name, path }, path: pathname, asideMenuRef }: { item: ItemAside, path: string, asideMenuRef: RefObject<HTMLElement | null> }) {
  const [subItems, setSubItems] = useState<MenuSubItem[]>()

  useEffect(() => {
    getSubItems(name)
  }, [])

  function getSubItems (name: string) {
    setSubItems([
      { name, link: '#', Icon: ({ active = false }: { active?: boolean }) => <IconHome active={active} /> },
      { name, link: '#', Icon: ({ active = false }: { active?: boolean }) => <IconHome active={active} /> },
      { name, link: '#', Icon: ({ active = false }: { active?: boolean }) => <IconHome active={active} /> },
      { name, link: '#', Icon: ({ active = false }: { active?: boolean }) => <IconHome active={active} /> },
      { name, link: '#', Icon: ({ active = false }: { active?: boolean }) => <IconHome active={active} /> }
    ])
  }

  function handleInput (event: TargetedEvent<HTMLInputElement>) {
    const { currentTarget: input } = event
    const savedCheck = input?.checked
    if (asideMenuRef.current) {
      const links = asideMenuRef.current.querySelectorAll('.expandableLink')
      links.forEach(link => {
        const checkbox = link.querySelector('input[name=checkbox-aside-items]')
        if (checkbox instanceof HTMLInputElement) {
          checkbox.checked = false
        }
      })
    }
    input.checked = savedCheck
  }

  return (
    <article class='expandableLink flex relative min-h-10'>
      <input
        id={`checkbox-aside-${name}`}
        type='checkbox'
        hidden
        name='checkbox-aside-items'
        class='[&:checked~.dropDown]:h-fit [&:not(:checked)~.dropDown]:h-10 [&:checked~label>div]:rotate-180'
        onInput={handleInput}
      />
      <div class='absolute w-full h-10 flex justify-between gap-2 items-center'>
        <a
          href={path}
          class={`${path === pathname ? 'actualPath bg-selected font-medium' : 'hover:bg-neutral-800'}
            flex-1 max-w-51 h-10 min-h-10 flex items-center gap-4 px-3 rounded-lg cursor-pointer active:bg-neutral-600`
          }
        >
          <div class='size-6 max-h-full aspect-square overflow-hidden'>
            <IconItem active={path === pathname} />
          </div>
          <span>{name}</span>
        </a>
        <div class='w-[2px] h-7 bg-neutral-800'></div>
        <label htmlFor={`checkbox-aside-${name}`} class='aspect-square flex items-center justify-center hover:bg-neutral-800 rounded-lg h-full cursor-pointer'>
          <Icon>
            <IconArrowDown />
          </Icon>
        </label>
      </div>
      <div class='dropDown w-full overflow-hidden rounded-lg [transition:height_250ms_ease] [interpolate-size:allow-keywords]'>
        <div class='w-full h-10' />
        {
          subItems?.map(sub => (
            <a key={useId()} href={sub.link} class='w-full h-10 flex items-center px-3 pl-6 gap-4 hover:bg-neutral-800 rounded-lg'>
              <Icon class='size-6 max-h-full aspect-square'>
                { sub.Icon && <IconItem /> }
              </Icon>
              <span>{sub.name}</span>
            </a>
          ))
        }
      </div>
    </article>
  )
}
