export type ItemAside = LinkItem | ButtonItem

export interface LinkItem {
  id: string
  name: string
  type: 'link'
  path: string
  Icon: ({ active }: { active?: boolean | undefined }) => JSX.Element
}

export interface ButtonItem {
  id: string
  name: string
  type: 'button'
  Icon: ({ active }: { active?: boolean | undefined }) => JSX.Element
}

export type MenuSubItem = {
  Icon?: ({ active }: { active?: boolean }) => JSX.Element
  name: string
  link: string
}
