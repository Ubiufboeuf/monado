import { create } from 'zustand'

export type DeviceType = 'mobile' | 'tablet' | 'desktop'

interface UIStore {
  deviceType: DeviceType | undefined
  setDeviceType: (deviceType: DeviceType) => void
}

export const useUIStore = create<UIStore>((set) => ({
  deviceType: undefined,
  setDeviceType: (deviceType) => set({ deviceType })
}))
