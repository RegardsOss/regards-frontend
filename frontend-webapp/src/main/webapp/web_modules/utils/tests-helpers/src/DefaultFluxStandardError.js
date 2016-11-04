/**
 * @module tests-helpers
 */

/**
 * @name defaultFluxStandardError
 * @type {{message: string, name: string, response: undefined, status: number, statusText: string}}
 */
const defaultFluxStandardError = {
  message: '500 - Internal Server Error',
  name: 'ApiError',
  response: undefined,
  status: 500,
  statusText: 'Internal Server Error',
}
export default defaultFluxStandardError
