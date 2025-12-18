export function HideMenu () {
  return (
    <label
      id='hideMenu'
      role='button'
      htmlFor='checkbox-menu-state'
      class='fixed left-0 top-0 z-9 w-full h-dvh [transition:all_250ms_ease_allow-discrete] pointer-events-none bg-transparent backdrop-blur-none menu-open:not-ml:pointer-events-auto menu-open:not-ml:bg-black/40 menu-open:not-ml:backdrop-blur-xs'
    />
  )
}
