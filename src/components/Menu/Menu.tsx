import { useId, useRef } from 'preact/hooks'
import { MenuExpandableLink } from '../AsideNavigation/MenuExpandableLink'
import { MenuLink } from '../AsideNavigation/MenuLink'
import { itemsAside } from '@/lib/menuItems'
import { useHydrationStore } from '@/stores/useHydrationStore'

export function Menu ({ pathname }: { pathname: string }) {
  const asideMenuRef = useRef<HTMLElement>(null)
  const isMenuOpen = useHydrationStore((state) => state.isMenuOpen)

  return (
    <aside
      ref={asideMenuRef}
      id='asideMenu'
      class='group fixed top-14 -left-60 menu-open:left-0 [transition:left_250ms_ease] z-100 w-60 h-[calc(100dvh-56px)] bg-base-dark'
      aria-hidden={!isMenuOpen}
    >
      <div class='h-full w-full max-h-full flex flex-col items-center gutter-stable px-3 pr-1 pb-2 overflow-y-scroll [scrollbar-width:thin] not-hover:[scrollbar-color:transparent_transparent]'>
        { itemsAside.map((item) => (
          <section key={useId()} class='flex flex-col w-full h-fit py-3 text-sm border-b border-neutral-700'>
            { item.map((item) => {
              const { Icon, name, type, path: link } = item
              return (type === 'expand') ? (
                <MenuExpandableLink
                  key={useId()}
                  item={item}
                  path={pathname}
                  asideMenuRef={asideMenuRef}
                  isMenuOpen={isMenuOpen}
                />
              ) : (
                <MenuLink
                  key={useId()}
                  name={name}
                  link={link}
                  path={pathname}
                  isMenuOpen={isMenuOpen}
                >
                  <Icon active={link === pathname} />
                </MenuLink>
              )
            }) }
          </section>
        ) )}
        <section>
          <a
            href='/about_this_project'
            class='cursor-pointer text-neutral-300 hover:text-blue-500 transition-colors'
            tabIndex={isMenuOpen ? 0 : -1}
          >
            Acerca de este proyecto
          </a>
        </section>
      </div>
    </aside>
  )
}
