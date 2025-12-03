export type Video = {
	id: string
  source: string
	title: string
	uploader: string
	uploader_id: string
	channel_follower_count: number
	channel_is_verified: boolean
	duration: number
	width: number
	height: number
	mixed_size: number
	aspect_ratio: string
	audios: (AudioMetadata | null)[]
	resolutions: ResolutionMetadata[]
	resolutionsById: ResolutionsById
	min_resolution: string
	max_resolution: string
	thumbnails: Thumbnail[]
	min_thumbnail: string
	max_thumbnail: string
	release_timestamp: number
}

export type AudioMetadata = {
	codec: string
	codec_long_name: string
	channel_layout: string | undefined
	channels: number | undefined
	bit_rate: number
	bit_rate_kbps: number
	duration: number
	sample_rate: number | undefined
	size: number | undefined
}

export type ResolutionMetadata = {
  id: string
	codec: string
	codec_long_name: string
	bit_rate: number
	bit_rate_kbps: number
	duration: number
	size: number | undefined
	height: number
	width: number
	aspect_ratio: string | undefined
	fps: number | undefined
}

export type ResolutionsById = Record<ResolutionMetadata['id'], ResolutionMetadata>

export type Thumbnail = {
  id: string
  height: number
  width: number
  url: string | null
}
