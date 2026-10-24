import type { PlayerLayout } from '@/types/playerTypes'
import type { Video } from '@/types/videoTypes'
import type shaka from 'shaka-player'
import { create } from 'zustand'

interface PlayerStore {
  element: HTMLVideoElement | undefined
  setElement: (element: HTMLVideoElement | undefined) => void
  
  playerLayout: PlayerLayout
  setPlayerLayout: (playerLayout: PlayerLayout) => void

  metadata: Video | undefined
  setMetadata: (metadata: Video | undefined) => void

  isPlaying: boolean
  setIsPlaying: (isPlaying: boolean) => void

  inFullScreen: boolean
  setInFullScreen: (inFullScreen: boolean) => void

  areControlsVisible: boolean
  setAreControlsVisible: (areControlsVisible: boolean) => void

  currentTime: number | undefined
  setCurrentTime: (time: number | undefined) => void

  duration: number | undefined
  setDuration: (duration: number | undefined) => void

  player: shaka.Player | undefined
  setPlayer: (qualities: shaka.Player | undefined) => void
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  element: undefined,
  setElement: (element) => set({ element }),
  
  playerLayout: 'tv',
  setPlayerLayout: (playerLayout) => set({ playerLayout }),

  metadata: undefined,
  setMetadata: (metadata) => set({ metadata }),

  isPlaying: false,
  setIsPlaying: (isPlaying) => set({ isPlaying }),

  inFullScreen: false,
  setInFullScreen: (inFullScreen) => set({ inFullScreen }),

  areControlsVisible: false,
  setAreControlsVisible: (areControlsVisible) => set({ areControlsVisible }),

  currentTime: undefined,
  setCurrentTime: (currentTime) => set({ currentTime }),

  duration: undefined,
  setDuration: (duration) => set({ duration }),

  player: undefined,
  setPlayer: (player) => set({ player })
}))
