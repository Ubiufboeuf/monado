import type { ReactNode } from 'preact/compat'

export function Icon ({ class: className = '', children }: { class?: string, children: ReactNode }) {
  return (
    <div className={`${className} not-[[class*=h-]]:h-10 not-[[class*=w-]]:w-10 flex items-center justify-center overflow-hidden`}>
      {children}
    </div>
  )
}
