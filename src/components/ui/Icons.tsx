/* eslint-disable react/no-unknown-property */
import type { SVGProps } from '@/types/ui/iconTypes'

const Svg = ({
  children, id, viewBox = '0 0 24 24',
  class: className, hidden,
  width = '24', height = '24',
  fill = 'transparent', stroke = 'currentColor', strokeWidth = '1', strokeLinecap = 'round', strokeLinejoin = 'round'
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

export const IconPlay = () => (
  <Svg fill='currentColor'>
    <path d='M8.5 16.4446V7.55609C8.5 7.29209 8.59058 7.07543 8.77175 6.90609C8.95292 6.73693 9.16433 6.65234 9.406 6.65234C9.4815 6.65234 9.56067 6.66326 9.6435 6.68509C9.72633 6.70676 9.80542 6.73943 9.88075 6.78309L16.8767 11.2368C17.0141 11.3305 17.117 11.4427 17.1855 11.5733C17.2542 11.7042 17.2885 11.8465 17.2885 12.0003C17.2885 12.1542 17.2542 12.2965 17.1855 12.4273C17.117 12.558 17.0141 12.6702 16.8767 12.7638L9.88075 17.2176C9.80525 17.2613 9.72592 17.2939 9.64275 17.3156C9.55975 17.3374 9.4805 17.3483 9.405 17.3483C9.16317 17.3483 8.95192 17.2638 8.77125 17.0946C8.59042 16.9253 8.5 16.7086 8.5 16.4446Z' />
  </Svg>
)

export const IconPause = () => (
  <Svg fill='currentColor'>
    <path d='M15.5 18.5C15.091 18.5 14.7387 18.3523 14.4432 18.0568C14.1477 17.7613 14 17.409 14 17V7C14 6.591 14.1477 6.23875 14.4432 5.94325C14.7387 5.64775 15.091 5.5 15.5 5.5H16.25C16.659 5.5 17.0113 5.64775 17.3068 5.94325C17.6023 6.23875 17.75 6.591 17.75 7V17C17.75 17.409 17.6023 17.7613 17.3068 18.0568C17.0113 18.3523 16.659 18.5 16.25 18.5H15.5ZM7.75 18.5C7.341 18.5 6.98875 18.3523 6.69325 18.0568C6.39775 17.7613 6.25 17.409 6.25 17V7C6.25 6.591 6.39775 6.23875 6.69325 5.94325C6.98875 5.64775 7.341 5.5 7.75 5.5H8.5C8.909 5.5 9.26125 5.64775 9.55675 5.94325C9.85225 6.23875 10 6.591 10 7V17C10 17.409 9.85225 17.7613 9.55675 18.0568C9.26125 18.3523 8.909 18.5 8.5 18.5H7.75Z' />
  </Svg>
)

export const IconPlayState = ({ isPlaying }: { isPlaying: boolean }) => (
  <Svg>
    { isPlaying ? <IconPause /> : <IconPlay /> }
  </Svg>
)

export const IconMaximize = () => (
  <Svg>
    <path d='M3.5 20.5V15.7885H5V19H8.2115V20.5H3.5ZM15.798 20.5V19H19.0095V15.7885H20.5095V20.5H15.798ZM3.5 8.2115V3.5H8.2115V5H5V8.2115H3.5ZM19.0095 8.2115V5H15.798V3.5H20.5095V8.2115H19.0095Z' fill='white' />
  </Svg>
)

export const IconMinimize = () => (
  <Svg>
    <path d='M6.7115 20.5V17.2885H3.5V15.7885H8.2115V20.5H6.7115ZM15.798 20.5V15.7885H20.5095V17.2885H17.298V20.5H15.798ZM3.5 8.2115V6.7115H6.7115V3.5H8.2115V8.2115H3.5ZM15.798 8.2115V3.5H17.298V6.7115H20.5095V8.2115H15.798Z' fill='white' />
  </Svg>
)

export const IconFullScreen = ({ inFullScreen }: { inFullScreen?: boolean }) => (
  <Svg>
    { inFullScreen ? <IconMinimize /> : <IconMaximize /> }
  </Svg>
)
