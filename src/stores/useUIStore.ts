import { create } from 'zustand'

interface UIStore {
  isMenuOpen: boolean | undefined
  setIsMenuOpen: (isMenuOpen: boolean) => void
}

export const useUIStore = create<UIStore>((set) => ({
  isMenuOpen: undefined,
  setIsMenuOpen: (isMenuOpen) => set({ isMenuOpen })
}))
