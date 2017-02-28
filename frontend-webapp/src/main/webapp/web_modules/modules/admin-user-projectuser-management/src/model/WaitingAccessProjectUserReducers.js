/**
 * LICENSE_PLACEHOLDER
 */
import { ProjectUserReducers } from './ProjectUserReducers'
import WaitingAccessProjectUserActions from './WaitingAccessProjectUserActions'

const instance = new ProjectUserReducers(WaitingAccessProjectUserActions)
export default instance

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export function getWaitingAccessProjectUserReducer(state, action) {
  return instance.reduce(state, action)
}

export const reducerPath = 'waiting-access-project-user'
