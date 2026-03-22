export interface Creator {
  id: string
  name: string
  channelUrl: string
  verified: false | 'general' | 'music'
  subscribers: number
}
