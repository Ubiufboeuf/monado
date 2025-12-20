import { useEffect, useRef } from 'preact/hooks'

interface CustomRangeProps {
  id: string
  maxValue: number
  listenForProgress: number
  onValueUpdate: (value: number) => void
}

export function CustomRange ({ id, maxValue, listenForProgress, onValueUpdate: updateValue }: CustomRangeProps) {
  const isMouseDownRef = useRef(false)
  const mouseTargetRef = useRef<HTMLElement>()
  const progressRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)
  const rangeRef = useRef<HTMLDivElement>(null)
  
  function handlePressCustomRange (event: MouseEvent) {
    isMouseDownRef.current = true
    mouseTargetRef.current = event.target as HTMLElement

    if (rangeRef.current) moveRange(event)
    
    window.addEventListener('mousemove', moveRange)
  }

  function moveRange (event: MouseEvent) {
    if (!mouseTargetRef.current?.closest('#timeline') || !isMouseDownRef.current || !rangeRef.current) return

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
    isMouseDownRef.current = false
    window.removeEventListener('mousemove', moveRange)
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
  }, [])

  useEffect(() => {
    updateProgress(listenForProgress)
  }, [listenForProgress])

  return (
    <div
      id={id}
      ref={rangeRef}
      class='group absolute bottom-14.5 left-1/2 translate-y-1/2 -translate-x-1/2 flex items-center h-5 w-[calc(100%-24px)] cursor-pointer'
      onMouseDown={handlePressCustomRange}
    >
      {/* track */}
      <div class='absolute flex items-center h-1 group-hover:h-1.5 w-full cursor-pointer rounded-full transition-all duration-300 bg-gray-900/60' />
      {/* progress */}
      <div ref={progressRef} class='absolute h-1 group-hover:h-1.5 rounded-full transition-[height] duration-300 [background:var(--color-gradient)]' />
      {/* thumb */}
      <div ref={thumbRef} class='absolute left-0 top-1/2 -translate-1/2 size-3 group-hover:size-5 rounded-full transition-[height,width] duration-300 [background:var(--color-gradient)] shadow-2xl' />
    </div>
  )
}
