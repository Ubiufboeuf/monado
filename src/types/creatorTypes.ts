export interface Creator {
  id: string
  name: string
  channelUrl: string
  verified: false | 'general' | 'music'
  subscribers: number
  assets: CreatorAssets
}

export interface CreatorAssets {
  profile: string
  banner: string
}
