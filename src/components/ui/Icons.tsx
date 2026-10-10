/* eslint-disable react/no-unknown-property */
import type { SVGProps } from '@/types/ui/iconTypes'

const Svg = ({
  children, id, viewBox = '0 0 24 24',
  class: className, hidden,
  width = '24', height = '24',
  fill = 'transparent', stroke = 'currentColor', strokeWidth = '2', strokeLinecap = 'round', strokeLinejoin = 'round'
}:
  SVGProps
) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    id={id}
    viewBox={viewBox}
    width={width}
    height={height}
    fill={fill}
    stroke={stroke}
    stroke-width={strokeWidth}
    stroke-linejoin={strokeLinejoin}
    stroke-linecap={strokeLinecap}
    hidden={hidden}
    class={`${className} h-full w-full pointer-events-none`}
  >
    {children}
  </svg>
)

export const IconLoader = () => (
  <Svg>
    <path d='M12 3a9 9 0 1 0 9 9' />
  </Svg>
)
