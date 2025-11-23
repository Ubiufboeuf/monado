import { errorHandler } from './errors'

export async function responseHandler (res: Response): Promise<unknown> {
  let text = ''
  let data = null
  let errorParsingJSON: unknown | boolean = false

  try {
    text = await res.text()
    data = JSON.parse(text)
  } catch (err) {
    errorParsingJSON = err
  }

  if (errorParsingJSON) {
    try {
      errorHandler(errorParsingJSON, 'Error parseando la respuesta')
      // console.log('response as text:', text)
      return
    } catch (err) {
      errorHandler(err, 'Error mostrando la respuesta')
      return
    }
  }

  // console.log('response as json:', data)
  return data
}
