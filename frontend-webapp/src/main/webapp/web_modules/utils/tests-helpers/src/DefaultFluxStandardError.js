/**
 */

/**
 * @name defaultFluxStandardError
 * @type {{message: string, name: string, response: undefined, status: number, statusText: string}}
 */
const defaultFluxStandardError = {
  name: 'ApiError',
  status: 500,
  statusText: 'Internal Server Error',
  message: '500 - Internal Server Error',
}
export default defaultFluxStandardError
