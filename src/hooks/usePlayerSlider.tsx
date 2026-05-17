import { setCurrentTime, togglePlayState } from '@/lib/playerActions'
import { alreadyPaused, draggedBySlider, isAnySliderInUse, mouseDownTarget, pausedBySlider, setAlreadyPaused, setDraggedBySlider, setIsAnySliderInUse, setPausedBySlider } from '@/stores/miniStore'
import { usePlayerStore } from '@/stores/usePlayerStore'
import type { RefObject } from 'preact'
import { useEffect } from 'preact/hooks'

interface PlayerSliderProps {
  instanceId: string
  sliderRef: RefObject<HTMLDivElement>
}

export function usePlayerSlider ({ instanceId, sliderRef }: PlayerSliderProps) {
  const duration = usePlayerStore((state) => state.duration)
  const currentTime = usePlayerStore((state) => state.currentTime)

  // - Handlers -
  
  function handleClick (event: PointerEvent) {
    event.stopPropagation()

    const { setCanHideControls } = usePlayerStore.getState()
    setCanHideControls(true)

    if (draggedBySlider) return

    const x = getMousePositionInSlider(event)
    
    updateSliderProgressByMouse(clampMousePosition(x))
  }

  async function handleMouseDown (event: MouseEvent) { 
    if (!checkIfMouseInSlider(event)) return

    const { element: video, setCanHideControls } = usePlayerStore.getState()
    if (!video) return

    setCanHideControls(false)
    
    setIsAnySliderInUse(true)
    setAlreadyPaused(video.paused)
    if (video.paused) return

    await togglePlayState()
    setPausedBySlider(true)
  }

  function handleMouseMove (event: MouseEvent) {
    if (!isAnySliderInUse) return

    setDraggedBySlider(true)

    const slider = sliderRef.current
    if (!slider) {
      throw new Error('No se encontró el slider')
    }

    const container = slider.querySelector(`[data-slider-id="${instanceId}:container"]`)
    if (!(container instanceof HTMLElement)) {
      throw new Error('No se encontró el contenedor principal del slider')
    }
    
    const thumb = slider.querySelector(`[data-slider-id="${instanceId}:thumb"]`)
    if (!(thumb instanceof HTMLElement)) {
      throw new Error('Error identificando el elemento "thumb" del slider')
    }

    const x = getMousePositionInSlider(event)
    const progress = clampMousePosition(x) / container.clientWidth
    thumb.style.left = `${calculateThumbPosition(progress)}px`
  }

  async function handleMouseUp (event: MouseEvent) {
    if (!duration) return

    const { setCanHideControls, element: video } = usePlayerStore.getState()
    setCanHideControls(true)

    if (!isAnySliderInUse) return
  
    if (mouseDownTarget?.closest('[data-slider-id$=slider]') && !video?.paused) return

    const slider = sliderRef.current
    if (!slider) {
      setIsAnySliderInUse(false)
      throw new Error('No se encontró el slider')
    }

    const container = slider.querySelector(`[data-slider-id="${instanceId}:container"]`)
    if (!(container instanceof HTMLElement)) {
      setIsAnySliderInUse(false)
      throw new Error('No se encontró el contenedor principal del slider')
    }

    const x = getMousePositionInSlider(event)
    const second = (x / container.clientWidth) * duration

    setCurrentTime(second)

    if (!video || alreadyPaused) {
      setIsAnySliderInUse(false)
      return
    }
    
    if (pausedBySlider) {
      await togglePlayState()
    }

    setIsAnySliderInUse(false)
  }

  function checkIfMouseInSlider (event: MouseEvent) {
    const { target } = event
    if (!(target instanceof HTMLElement)) return
    
    const closestSlider = target.closest(`#${instanceId}`)
    if (!closestSlider) return
    
    const slider = sliderRef.current
    if (!slider) return
    
    return slider.id === closestSlider.id
  }

  // - Movimiento del slider por mouse -

  function getMousePositionInSlider (event: PointerEvent | MouseEvent) {
    const slider = sliderRef.current
    if (!slider) {
      throw new Error('No se encontró el slider')
    }

    const container = slider.querySelector(`[data-slider-id="${instanceId}:container"]`)
    if (!(container instanceof HTMLElement)) {
      throw new Error('No se encontró el contenedor principal del slider')
    }

    const containerRect = container.getBoundingClientRect()
    const x = event.clientX - containerRect.left
    
    return x
  }

  function updateSliderProgressByMouse (x: number) {
    const slider = sliderRef.current
    if (!slider) {
      throw new Error('No se encontró el slider')
    }

    const container = slider.querySelector(`[data-slider-id="${instanceId}:container"]`)
    if (!(container instanceof HTMLElement)) {
      throw new Error('No se encontró el contenedor principal del slider')
    }

    // console.log({ x, duration, containerWidth: container.clientWidth })

    if (!duration) {
      throw new Error('Duración del video inválida')
    }

    const second = (x / container.clientWidth) * duration
    setCurrentTime(second)
  }

  function clampMousePosition (x: number) {
    const slider = sliderRef.current
    if (!slider) {
      throw new Error('No se encontró el slider')
    }

    const container = slider.querySelector(`[data-slider-id="${instanceId}:container"]`)
    if (!container) {
      throw new Error('No se encontró el contenedor principal del slider')
    }

    return Math.max(0, Math.min(x, container.clientWidth))
  }

  // - Movimiento del slider -

  function updateSliderProgress (second: number) {
    const slider = sliderRef.current
    if (!slider) {
      throw new Error('No se encontró el slider')
    }

    const container = slider.querySelector(`[data-slider-id="${instanceId}:container"]`)
    if (!(container instanceof HTMLElement)) {
      throw new Error('No se encontró el contenedor principal del slider')
    }
    
    const $progress = slider.querySelector(`[data-slider-id="${instanceId}:progress"]`)
    if (!($progress instanceof HTMLElement)) {
      throw new Error('Error identificando el elemento "progress" del slider')
    }

    const thumb = slider.querySelector(`[data-slider-id="${instanceId}:thumb"]`)
    if (!(thumb instanceof HTMLElement)) {
      throw new Error('Error identificando el elemento "thumb" del slider')
    }

    if (!duration) {
      throw new Error('Duración del video inválida')
    }

    const progress = second / duration

    $progress.style.width = `${calculateProgressValue(progress)}px`
    thumb.style.left = `${calculateThumbPosition(progress)}px`
  }

  function calculateProgressValue (progress: number) {
    const slider = sliderRef.current
    if (!slider) {
      throw new Error('No se encontró el slider')
    }

    const container = slider.querySelector(`[data-slider-id="${instanceId}:container"]`)
    if (!container) {
      throw new Error('No se encontró el contenedor principal del slider')
    }
    
    const minValue = 0
    const maxValue = container.clientWidth
    const position = progress * maxValue
    const progressValue = Math.max(minValue, Math.min(position, maxValue))
    return progressValue
  }

  function calculateThumbPosition (progress: number) {
    const slider = sliderRef.current
    if (!slider) {
      throw new Error('No se encontró el slider')
    }

    const container = slider.querySelector(`[data-slider-id="${instanceId}:container"]`)
    if (!container) {
      throw new Error('No se encontró el contenedor principal del slider')
    }

    const thumb = slider.querySelector(`[data-slider-id="${instanceId}:thumb"]`)
    if (!(thumb instanceof HTMLElement)) {
      throw new Error('Error identificando el elemento "thumb" del slider')
    }
    
    const thumbWidth = thumb.clientWidth
    const containerWidth = container.clientWidth
    const position = progress * containerWidth - thumbWidth / 2
    return position
  }

  // - Effects -
  
  useEffect(() => {
    const slider = sliderRef.current
    if (!slider || duration === undefined) return

    slider.addEventListener('click', handleClick)
    slider.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      slider.removeEventListener('click', handleClick)
      slider.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [sliderRef, duration])
  
  useEffect(() => {
    if (currentTime === undefined || duration === undefined) return
    updateSliderProgress(currentTime)
  }, [currentTime, duration])
}
