import type { SVGAttributes } from 'preact'
import type { ReactNode } from 'preact/compat'

export interface SVGProps {
  children: ReactNode
  id?: string
  viewBox?: string
  class?: string
  width?: string
  height?: string
  fill?: string
  stroke?: string
  strokeWidth?: string | number
  strokeLinecap?: SVGAttributes<SVGSVGElement>['strokeLinecap']
  strokeLinejoin?: SVGAttributes<SVGSVGElement>['strokeLinejoin']
  hidden?: boolean
}

export type IconThickness = string | number
