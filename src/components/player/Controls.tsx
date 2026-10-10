import { useUIStore } from '@/stores/useUIStore'
import { useEffect, useState } from 'preact/hooks'
import { MobileControls } from './mobile/MobileControls'
import { DesktopControls } from './desktop/DesktopControls'

export function Controls () {
  const isDesktop = useUIStore((state) => state.deviceType === 'desktop')
  const [hydrated, setHydrated] = useState<boolean | undefined>(undefined)
    
  useEffect(() => {
    if (hydrated === undefined) setHydrated(true)
  }, [hydrated])
  
  if (hydrated === undefined) return

  return isDesktop
    ? <DesktopControls />
    : <MobileControls />
}
