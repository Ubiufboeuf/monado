import { Drawer } from '@base-ui/react'
import type { ComponentChildren } from 'preact'
import type { Dispatch, StateUpdater } from 'preact/hooks'

interface Props {
  isOpen?: boolean
  setIsOpen?: Dispatch<StateUpdater<boolean>>
  trigger?: ComponentChildren
  triggerClass?: string
  title?: ComponentChildren
  titleClass?: string
  children?: ComponentChildren
  contentClass?: string
}

export function BaseDrawer ({ isOpen, setIsOpen, trigger, triggerClass, title, titleClass, contentClass, children }: Props) {
  return (
    <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
      { trigger && <Drawer.Trigger class={`${triggerClass} z-100 not-[[class*=h-]]:h-fit not-[[class*=w-]]:w-fit flex items-center justify-center overflow-hidden`}>
        {trigger}
      </Drawer.Trigger> }
      <Drawer.Portal>
        <Drawer.Backdrop class='z-100 fixed inset-0 min-h-dvh w-full bg-black backdrop' />
        <Drawer.Viewport class='z-100 fixed inset-0 w-full flex items-end justify-center'>
          <Drawer.Popup class='w-full max-h-[80dvh] h-fit flex flex-col items-center justify-end gap-4 pt-4 rounded-t-xl bg-neutral-900 outline-0 popup'>
            <div class='w-2/10 h-1 bg-neutral-700' />
            <Drawer.Content class='w-full h-full'>
              { title && <Drawer.Title class={`${titleClass} w-full h-fit text-center font-bold text-lg`}>{title}</Drawer.Title> }
              <div class={`${contentClass} max-w-full wrap-anywhere`}>
                {children}
              </div>
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
