import { create } from 'zustand'

interface SearchStore {
  query: string | undefined
  setQuery: (query: string) => void
}

export const useSearchStore = create<SearchStore>((set) => ({
  query: undefined,
  setQuery: (query) => set({ query })
}))
