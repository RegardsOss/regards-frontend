/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalReducers } from '@regardsoss/store-utils'
import { WaitingAccessUsersSignalActions } from './WaitingAccessUsersSignalActions'


const instance = new BasicSignalReducers(WaitingAccessUsersSignalActions)
export default instance

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export const getWaitingAccessProjectSignalReducer = (state, action) => instance.reduce(state, action)

export const pathname = 'waiting-access-users-signals'
