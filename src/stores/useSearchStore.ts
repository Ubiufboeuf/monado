import { create } from 'zustand'

interface SearchStore {
  query: string | undefined
  setQuery: (query: string) => void
  isTabBarSearching: boolean
  setIsTabBarSearching: (isSearching: boolean) => void
}

export const useSearchStore = create<SearchStore>((set) => ({
  query: undefined,
  setQuery: (query) => set({ query }),
  isTabBarSearching: false,
  setIsTabBarSearching: (isTabBarSearching) => set({ isTabBarSearching })
}))
