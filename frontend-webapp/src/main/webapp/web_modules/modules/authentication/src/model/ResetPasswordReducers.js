/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalReducers } from '@regardsoss/store-utils'
import ResetPasswordActions from './ResetPasswordActions'


const instance = new BasicSignalReducers(ResetPasswordActions)

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export default (state, action) => instance.reduce(state, action)
