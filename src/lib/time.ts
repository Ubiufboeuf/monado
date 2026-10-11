/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */

export function debounce<T extends Function> (func: (this: T, ...args: any[]) => any, timeout: number): any {
  let timeoutId: number | null = null

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
