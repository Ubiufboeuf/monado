import type { ComponentChildren, SVGAttributes } from 'preact'

export interface SVGProps {
  children: ComponentChildren
  viewBox?: string
  width?: string
  height?: string
  gradient?: boolean
  fill?: string
  stroke?: string
  strokeWidth?: string
  strokeLinecap?: SVGAttributes<SVGSVGElement>['strokeLinecap']
  strokeLinejoin?: SVGAttributes<SVGSVGElement>['strokeLinejoin']
  hidden?: boolean
}
