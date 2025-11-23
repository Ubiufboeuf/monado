export type ItemAside = {
  name: string
  path: string
  type?: string
  Icon: ({ active }: { active?: boolean | undefined }) => JSX.Element
}

export type MenuSubItem = {
  Icon?: ({ active }: { active?: boolean }) => JSX.Element
  name: string
  link: string
}
