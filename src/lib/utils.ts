export function padStart (value: number | string, length: number, fill: string) {
  const str = typeof value === 'number'
    ? value.toString()
    : value

  return str.padStart(length, fill)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
