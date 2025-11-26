import { useId, useState } from 'preact/hooks'
import { Icon } from './Icon'
import { itemsAside } from '@/lib/menuItems'

export function MenuMini () {
  const [pathname] = useState<string>('/')

  return (
    <aside
      id='menu-mini'
      class='fixed left-0 z-98 hidden sm:flex flex-col items-center gap-2 w-18 h-[calc(100%-56px)] px-2 overflow-y-auto [scrollbar-width:none] bg-base-dark'
    >
      <div class='min-h-fit w-fit h-full pb-1'>
        { itemsAside.map(item => (
          <section key={useId()} class='border-b border-neutral-700 py-3'>
            { item.map(({ name, Icon: ItemIcon, path }) => (
              <a
                key={useId()}
                href={path}
                title={name}
                class={`${path === pathname ? 'actualPathMini bg-selected font-medium' : 'hover:bg-neutral-800'} h-10 aspect-square flex flex-col rounded-lg items-center justify-center active:bg-neutral-600 active:transition-colors`}
              >
                <Icon class='aspect-square'>
                  <ItemIcon active={path === pathname} />
                </Icon>
              </a>
            )) }
          </section>
        )) }
      </div>
    </aside>
  )
}
