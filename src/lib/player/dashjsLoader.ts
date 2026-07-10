import type { DashJS } from '@/types/playerTypes'

export async function importDashjs (): Promise<DashJS> {
  return import('dashjs')
    .then((dashjs) => dashjs)
}

// async function destroyPlayer () {
//   playerRef.current?.destroy()
//   playerRef.current = undefined
// }

// async function createPlayer () {
//   const player = playerRef.current
//   if (player) await destroyPlayer()
  
//   if (!dashjs) {
//     console.error('DashJS no importado')
//     return
//   }

//   const newPlayer = dashjs.MediaPlayer().create()
//   if (!newPlayer) {
//     console.error('No se pudo crear el nuevo reproductor')
//     return
//   }

//   return newPlayer
// }
