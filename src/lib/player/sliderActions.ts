import { usePlayerStore } from '@/stores/usePlayerStore'

interface TimelineUpdaterProps {
  element?: HTMLElement
}

export function getSliderComponents (slider: HTMLElement) {
  const sliderId = slider.id
  
  const container = slider.querySelector(`[data-slider-id="${sliderId}:container"]`)
  if (!container) {
    throw new Error('No se encontró el contenedor principal del slider')
  }
  
  const progress = slider.querySelector(`[data-slider-id="${sliderId}:progress"]`)
  if (!(progress instanceof HTMLElement)) {
    throw new Error('Error identificando el elemento "progress" del slider')
  }

  const thumb = slider.querySelector(`[data-slider-id="${sliderId}:thumb"]`)
  if (!(thumb instanceof HTMLElement)) {
    throw new Error('Error identificando el elemento "thumb" del slider')
  }

  return {
    $container: container,
    $progress: progress,
    $thumb: thumb
  }
}


export function updateTimeline ({ element }: TimelineUpdaterProps = {}) {
  const { element: video } = usePlayerStore.getState()
  if (!video) return
  
  const $timeline = element ?? document.querySelector('#timeline')
  if (!$timeline) {
    throw new Error('No se pudo encontrar el timeline del reproductor')
  }
  
  const { $container, $progress, $thumb } = getSliderComponents($timeline)

  const { duration, currentTime: second } = video
  const progress = second / duration

  const thumbWidth = $thumb.clientWidth
  const sliderWidth = $container.clientWidth
  const position = progress * sliderWidth

  const thumbPosition = progress * sliderWidth - thumbWidth / 2
  const progressWidth = Math.max(0, Math.min(position, sliderWidth))

  $thumb.style.left = `${thumbPosition}px`
  $progress.style.width = `${progressWidth}px`
}
