/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalReducers } from '@regardsoss/store-utils'
import { WaitingAccountSignalActions } from './WaitingAccountSignalActions'


const instance = new BasicSignalReducers(WaitingAccountSignalActions)

/**
 * Return a function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export default (state, action) => instance.reduce(state, action)

export const PATHNAME = 'waiting-account-signals'
