import { MiddleControls } from './TouchableControls/MiddleControls'
import { BottomControls } from './TouchableControls/BottomControls'

export function TouchableControls () {
  return (
    <div class='pointer-fine:hidden absolute left-0 top-0 h-full w-full flex flex-col gap-4'>
      <MiddleControls />
      <BottomControls />
    </div>
  )
}
