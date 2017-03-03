import { BasicSignalReducers } from '@regardsoss/store-utils'
import { AccessGroupConfiguration } from '@regardsoss/api'
import AccessGroupActions from './AccessGroupActions'

class UserGroupReducers extends BasicSignalReducers {
  constructor() {
    super(AccessGroupConfiguration, AccessGroupActions)
  }
}

const instance = new UserGroupReducers()
export default instance

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export function getUserGroupReducer(state, action) {
  return instance.reduce(state, action)
}

export const reducerPath = 'user-group'
