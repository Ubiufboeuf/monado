export function navigate (href: string) {
  window.history.pushState({}, '', href)
}
