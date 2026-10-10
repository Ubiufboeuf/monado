import { create } from 'zustand'

interface UIStore {
  deviceType: 'desktop' | 'mobile'
  setDeviceType: (deviceType: 'desktop' | 'mobile') => void
}

export const useUIStore = create<UIStore>((set) => ({
  deviceType: 'desktop',
  setDeviceType: (deviceType) => set({ deviceType })
}))
