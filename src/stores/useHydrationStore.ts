import { create } from 'zustand'

interface HydrationStore {
  isMenuOpen: boolean | undefined
  setIsMenuOpen: (isMenuOpen: boolean) => void
}

export const useHydrationStore = create<HydrationStore>((set) => ({
  isMenuOpen: undefined,
  setIsMenuOpen: (isMenuOpen) => set({ isMenuOpen })
}))
