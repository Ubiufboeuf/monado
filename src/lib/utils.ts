/* eslint-disable @typescript-eslint/no-this-alias */
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
