/* eslint-disable @typescript-eslint/no-this-alias */

import { v4 } from 'uuid'

/* eslint-disable @typescript-eslint/no-explicit-any */
export function padStart (value: number | string, length: number, fill: string) {
  const str = typeof value === 'number'
    ? value.toString()
    : value

  return str.padStart(length, fill)
}

export function getMax (arr: any[], fallback: 'first' | 'last') {
  let max = fallback === 'first' ? arr[0] : arr.at(-1)

  const sorted = [...arr].sort((a, b) => {
    if (a > b) return 1
    if (a < b) return -1
    return 0
  })
  
  max = sorted.at(-1) ?? max

  return max
}

export function getMin (arr: any[], fallback: 'first' | 'last') {
  let min = fallback === 'first' ? arr[0] : arr.at(-1)

  const sorted = [...arr].sort((a, b) => {
    if (a > b) return 1
    if (a < b) return -1
    return 0
  })
  
  min = sorted.at(0) ?? min

  return min
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function debounce<T extends Function> (func: (this: T, ...args: any[]) => any, timeout: number): any {
  let timeoutId: NodeJS.Timeout | null = null

  return function (this: T, ...args: any[]) {
    const context = this
    
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      func.apply(context, args)
    }, timeout)
  }
}

export function throttle (func: (...args: any[]) => any, limit: number) {
  let inThrottle: boolean
  let lastResult: any

  return function (this: any, ...args: any[]) {
    const context = this

    if (!inThrottle) {
      lastResult = func.apply(context, args)
      
      inThrottle = true

      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
    
    return lastResult
  }
}

const randomSelectorList = new Map<string, number[]>()

export function getRandomItem<T> (list: T[], selectorId?: string): [T, string] {  
  if (!list.length || list.length < 2) {
    throw new Error('La lista es demasiado corta')
  }

  let id = selectorId
  if (!id) {
    id = v4()
    randomSelectorList.set(id, [])
  }
  
  const history = randomSelectorList.get(id)
  if (!history) {
    throw new Error(`Error con la lista de elementos aleatorios de id: ${id}`)
  }

  let availableItems = list
    .map((_, idx) => idx)
    .filter((item) => !history.includes(item))
  
  if (!availableItems.length) {
    history.length = 3
    availableItems = list.map((_, idx) => idx)
  }

  const randomIndexInAvailableItems = Math.floor(Math.random() * availableItems.length)
  const randomNumber = availableItems[randomIndexInAvailableItems]
  
  history.unshift(randomNumber)
  history.length = Math.min(list.length - 1, 8)
  
  return [list[randomNumber], id]
}
