export function padStart (value: number | string, length: number, fill: string) {
  const str = typeof value === 'number'
    ? value.toString()
    : value

  return str.padStart(length, fill)
}
