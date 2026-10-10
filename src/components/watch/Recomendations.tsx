import { navigate } from 'astro:transitions/client'
import type { TargetedMouseEvent } from 'preact'

export function Recomendations () {
  function changeVideo (event: TargetedMouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
    
    const href = event.currentTarget.href
    const id = new URL(href).searchParams.get('v')
    navigate(`/watch?v=${id}`)
  }
  
  return (
    <section class='flex flex-col gap-4 *:p-4'>
      <a href='/watch?v=798etN3reyk' onClick={changeVideo}>798etN3reyk</a>
      <a href='/watch?v=siJE6CADALM' onClick={changeVideo}>siJE6CADALM</a>
      <a href='/watch?v=wKVJi-FLvak' onClick={changeVideo}>wKVJi-FLvak</a>
    </section>
  )
}
