/**
 * LICENSE_PLACEHOLDER
 **/
import { RECEIVE_ERROR, CLOSE_ERROR_DIALOG } from './action'

/**
 * Reducers to manage gobal-system-error store actions
 * @param state
 * @param action
 * @returns {*}
 */
export default (state = {
  opened: false,
  message: '',
}, action) => {
  switch (action.type) {
    case RECEIVE_ERROR:
      return Object.assign({}, state, {
        opened: true,
        message: action.message,
      })
    case CLOSE_ERROR_DIALOG:
      return Object.assign({}, state, {
        opened: false,
      })
    default:
      return state
  }
}
