/**
 * LICENSE_PLACEHOLDER
 */
import { ProjectUserReducers } from './ProjectUserReducers'
import WaitingAccessUsersFetchActions from './WaitingAccessUsersFetchActions'

const instance = new ProjectUserReducers(WaitingAccessUsersFetchActions)
export default instance

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export function getWaitingAccessProjectFetchReducer(state, action) {
  return instance.reduce(state, action)
}

export const reducerPath = 'waiting-access-project-user'
