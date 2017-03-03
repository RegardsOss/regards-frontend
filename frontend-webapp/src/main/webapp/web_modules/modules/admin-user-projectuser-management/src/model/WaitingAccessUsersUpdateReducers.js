/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalReducers } from '@regardsoss/store-utils'
import { WaitingAccessUsersUpdateActions } from './WaitingAccessUsersUpdateActions'


const instance = new BasicSignalReducers(WaitingAccessUsersUpdateActions)
export default instance

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export const getWaitingAccessProjectUpdateReducer = (state, action) => instance.reduce(state, action)

export const pathname = 'waiting-access-update-signals'
