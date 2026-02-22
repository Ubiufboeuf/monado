export type ItemAside = {
  name: string
  path: string
  type?: string
  Icon: ({ active }: { active?: boolean | undefined }) => JSX.Element
}

export type TabBarItem = LinkItem | ButtonItem

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

export type Resolution = 'audio' | '18p' | '144p' | '240p' | '360p' | '480p' | '720p' | 'hd' | 'fhd' | 'qhd' | '4k'
