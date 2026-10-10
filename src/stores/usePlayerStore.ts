import type { PlayerLayout } from '@/types/playerTypes'
import { create } from 'zustand'

interface PlayerStore {
  element: HTMLVideoElement | undefined
  setElement: (element: HTMLVideoElement | undefined) => void
  
  playerLayout: PlayerLayout
  setPlayerLayout: (playerLayout: PlayerLayout) => void

  isPlaying: boolean
  setIsPlaying: (isPlaying: boolean) => void
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  element: undefined,
  setElement: (element) => set({ element }),
  
  playerLayout: 'tv',
  setPlayerLayout: (playerLayout) => set({ playerLayout }),

  isPlaying: false,
  setIsPlaying: (isPlaying) => set({ isPlaying })
}))
