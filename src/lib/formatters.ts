export function formatTime (duration: number = 0) {
  const hours = Math.floor(duration / 3600)
  const minutes = Math.floor(duration / 60) % 60
  const seconds = Math.floor(duration % 60)

  return new Intl.DurationFormat('en', {
    style: 'digital',
    hoursDisplay: hours ? 'always' : 'auto',
    minutesDisplay: 'always',
    secondsDisplay: 'always'
  }).format({ hours, minutes, seconds })
}

export function formatCompact (value: number = 0) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1
  }).format(value)
}
