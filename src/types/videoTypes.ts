import type z from 'zod'
import type { VideoSchema } from '@/schemas/videoSchemas'

export type Resolution = 'audio' | '18p' | '144p' | '240p' | '360p' | '480p' | '720p' | 'hd' | 'fhd' | 'qhd' | '4k'
export type Video = z.infer<typeof VideoSchema>
