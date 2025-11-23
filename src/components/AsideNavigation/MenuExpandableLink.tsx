import type { ItemAside, MenuSubItem } from '@/types/env'
import type { RefObject, TargetedEvent } from 'preact'
import { useEffect, useId, useState } from 'preact/hooks'
import { IconArrowDown, IconHome } from '../Icons'

export function MenuExpandableLink ({ item: { Icon, name, path }, path: pathname, asideMenuRef }: { item: ItemAside, path: string, asideMenuRef: RefObject<HTMLElement | null> }) {
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
    <article className='expandableLink flex relative min-h-10'>
      <input
        id={`checkbox-aside-${name}`}
        type='checkbox'
        hidden
        name='checkbox-aside-items'
        className='[&:checked~.dropDown]:h-fit [&:not(:checked)~.dropDown]:h-10 [&:checked~label>div]:rotate-180'
        onInput={handleInput}
      />
      <div className='absolute w-full h-10 flex justify-between gap-2 items-center'>
        <a
          href={path}
          className={`${path === pathname ? 'actualPath bg-selected font-medium' : 'hover:bg-neutral-800'}
            flex-1 max-w-[204px] h-10 min-h-10 flex items-center gap-4 px-3 rounded-lg cursor-pointer active:bg-neutral-600`
          }
        >
          <div className='size-6 max-h-full aspect-square overflow-hidden'>
            <Icon active={path === pathname} />
          </div>
          <span>{name}</span>
        </a>
        <div className='w-[2px] h-7 bg-neutral-800'></div>
        <label htmlFor={`checkbox-aside-${name}`} className='aspect-square flex items-center justify-center hover:bg-neutral-800 rounded-lg h-full cursor-pointer'>
          <div>
            <IconArrowDown />
          </div>
        </label>
      </div>
      <div className='dropDown w-full overflow-hidden rounded-lg [transition:height_250ms_ease] [interpolate-size:allow-keywords]'>
        <div className='w-full h-10' />
        {
          subItems?.map(sub => (
            <a key={useId()} href={sub.link} className='w-full h-10 flex items-center px-3 gap-4 hover:bg-neutral-800 rounded-lg'>
              <div className='size-6 max-h-full aspect-square overflow-hidden'>
                { sub.Icon && <Icon /> }
              </div>
              <span>{sub.name}</span>
            </a>
          ))
        }
      </div>
    </article>
  )
}
