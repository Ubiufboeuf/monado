import { usePlayerStore } from '@/stores/usePlayerStore'
import { useEffect, useRef } from 'preact/hooks'

interface CustomRangeProps {
  id: string
  maxValue: number
  listenForProgress: number
  onValueUpdate: (value: number) => void
  onMouseDown?: () => void
  onMouseUp?: () => void
  rangeClass?: string
  trackClass?: string
  progressClass?: string
  thumbClass?: string
}

export function CustomRange ({ id, maxValue, listenForProgress, onValueUpdate: updateValue, onMouseDown, onMouseUp, rangeClass, trackClass, progressClass, thumbClass }: CustomRangeProps) {
  const isMouseDownRef = useRef(false)
  const mouseTargetRef = useRef<HTMLElement>()
  const progressRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)
  const rangeRef = useRef<HTMLDivElement>(null)

  const hasPlayed = usePlayerStore((state) => state.hasPlayed)

  function handlePressCustomRange (event: MouseEvent) {
    isMouseDownRef.current = true
    mouseTargetRef.current = event.target as HTMLElement
    
    onMouseDown?.()

    if (rangeRef.current) moveRange(event)
    
    window.addEventListener('mousemove', moveRange)
  }

  function moveRange (event: MouseEvent) {
    if (!mouseTargetRef.current?.closest(`#${id}`) || !isMouseDownRef.current || !rangeRef.current) return

    const { x } = event
    const { left, width } = rangeRef.current.getBoundingClientRect()
    const start = left
    const end = width
    const percent = (x - start) / (end)
    
    const value = Math.max(0, Math.min(percent * maxValue, maxValue))
    const position = Math.max(0, Math.min(x - start, end))

    updateValue(value)
    
    if (progressRef.current) progressRef.current.style.width = `${position}px`
    if (thumbRef.current) thumbRef.current.style.left = `${position}px`
  }

  function handleMouseUp () {
    if (!hasPlayed) return

    isMouseDownRef.current = false
    window.removeEventListener('mousemove', moveRange)
    onMouseUp?.()
  }

  function updateProgress (currentValue: number) {
    if (!rangeRef.current) return

    const { width } = rangeRef.current.getBoundingClientRect()
    const position = (currentValue / maxValue) * width
    const safePosition = Math.max(0, Math.min(position, width))

    if (progressRef.current) progressRef.current.style.width = `${safePosition}px`
    if (thumbRef.current) thumbRef.current.style.left = `${safePosition}px`
  }

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [hasPlayed])

  useEffect(() => {
    updateProgress(listenForProgress)
  }, [listenForProgress])

  return (
    <div
      id={id}
      ref={rangeRef}
      class={rangeClass}
      onMouseDown={handlePressCustomRange}
    >
      <div class={trackClass} /> {/* track */}
      <div ref={progressRef} class={progressClass} /> {/* progress */}
      <div ref={thumbRef} class={thumbClass} /> {/* thumb */}
    </div>
  )
}
