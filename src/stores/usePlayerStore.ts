import { playerKeyboardActions } from '@/lib/keyboardActions'
import type { Video } from '@/types/videoTypes'
import { create } from 'zustand'

type PlayerStore = {
  video: Video | null
  player: HTMLVideoElement | null
  playerActions: typeof playerKeyboardActions
  setVideo: (video: Video) => void
  setPlayer: (player: HTMLVideoElement) => void
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  video: null,
  player: null,
  playerActions: playerKeyboardActions,
  setVideo: (video) => set({ video }),
  setPlayer: (player) => set({ player })
}))
