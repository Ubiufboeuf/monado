import { DEV } from './constants'

export function errorHandler (err: unknown, baseMessage?: string | null, canShow: boolean | 'dev' = true, ignoreNoMessage = false) {
  let errorToShow: string | unknown = ''

  if (err instanceof Error && baseMessage) {
    errorToShow = `${baseMessage}: ${err.message}`
  } else if (err instanceof Error) {
    errorToShow = err.message
  } else if (baseMessage) {
    errorToShow = baseMessage
  } else if (!ignoreNoMessage) {
    errorToShow = `Error desconocido: ${err}`
  } else {
    errorToShow = err
  }

  if ((canShow === 'dev' && DEV) || (canShow === true)) {
    console.error(errorToShow)
  }

  return errorToShow
}
