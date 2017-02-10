/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalReducers } from '@regardsoss/store-utils'
import { UnlockAccountActions } from './UnlockAccountActions'


const instance = new BasicSignalReducers(UnlockAccountActions)

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export default (state, action) => instance.reduce(state, action)
