export let isTryingToPlay = false
export function setIsTryingToPlay (isTrying: boolean) { isTryingToPlay = isTrying }

export let isAnySliderInUse = false
export function setIsAnySliderInUse (isAnyInUse: boolean) { isAnySliderInUse = isAnyInUse }

export let alreadyPaused = false
export function setAlreadyPaused (isAlreadyPaused: boolean) { alreadyPaused = isAlreadyPaused }

export let pausedBySlider = false
export function setPausedBySlider (bySlider: boolean) { pausedBySlider = bySlider }

export let mouseDownTarget: HTMLElement | null = null
export function setMouseDownTarget (target: HTMLElement | null) { mouseDownTarget = target }

export let draggedBySlider = false
export function setDraggedBySlider (dragged: boolean) { draggedBySlider = dragged }
