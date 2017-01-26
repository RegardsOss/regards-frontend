/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Action type to throw a new error and to open the error dialog box
 * @type {string}
 */
export const RECEIVE_ERROR = 'RECEIVE_ERROR'
/**
 * Action type to close the error dialog box
 * @type {string}
 */
export const CLOSE_ERROR_DIALOG = 'CLOSE_ERROR_DIALOG'

/**
 * Dispatch action
 */
export const closeErrorDialog = () => ({
  type: CLOSE_ERROR_DIALOG,
})

/**
 * Dispatch action with the given message as error to display in the error dialog box
 * @param message
 */
export const throwError = (message, meta, payload) => ({
  type: RECEIVE_ERROR,
  message,
  meta,
  payload,
})

export default {
  RECEIVE_ERROR,
  CLOSE_ERROR_DIALOG,
  closeErrorDialog,
  throwError,
}
