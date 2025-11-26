import type { ReactNode } from 'preact/compat'

export function Icon ({ class: className = '', children }: { class?: string, children: ReactNode }) {
  return (
    <div class={`${className} not-[[class*=h-]]:h-6 not-[[class*=w-]]:w-6 flex items-center justify-center overflow-hidden`}>
      {children}
    </div>
  )
}
