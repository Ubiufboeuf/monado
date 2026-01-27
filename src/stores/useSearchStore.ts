import { create } from 'zustand'

interface SearchStore {
  query: string | undefined
  setQuery: (query: string) => void
  isMobileSearching: boolean
  setIsMobileSearching: (isSearching: boolean) => void
}

export const useSearchStore = create<SearchStore>((set) => ({
  query: undefined,
  setQuery: (query) => set({ query }),
  isMobileSearching: false,
  setIsMobileSearching: (isMobileSearching) => set({ isMobileSearching })
}))
