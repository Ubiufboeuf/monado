import { useUIStore } from '@/stores/useUIStore'
import { useEffect, useState } from 'preact/hooks'
import { MobileControls } from './MobileControls/MobileControls'
import { DesktopControls } from './DesktopControls/DesktopControls'

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
