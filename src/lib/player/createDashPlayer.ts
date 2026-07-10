import type { DashJS } from '@/types/playerTypes'

export function createDashPlayer (dashjs: DashJS) {
  const player = dashjs.MediaPlayer().create()

  if (!player) {
    throw new Error('No se pudo crear el reproductor')
  }

  return player
}
