import { create } from 'zustand'

interface UIStore {
  deviceType: undefined | 'desktop' | 'mobile'
  setDeviceType: (deviceType: 'desktop' | 'mobile') => void
}

export const useUIStore = create<UIStore>((set) => ({
  deviceType: undefined,
  setDeviceType: (deviceType) => set({ deviceType })
}))
