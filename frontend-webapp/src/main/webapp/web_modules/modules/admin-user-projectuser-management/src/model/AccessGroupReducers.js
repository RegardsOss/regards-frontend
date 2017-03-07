import { BasicPageableReducers } from '@regardsoss/store-utils'
import { AccessGroupConfiguration } from '@regardsoss/api'
import AccessGroupActions from './AccessGroupActions'

class AccessGroupReducers extends BasicPageableReducers {
  constructor() {
    super(AccessGroupConfiguration, AccessGroupActions)
  }
}

const instance = new AccessGroupReducers()
export default instance

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export function getAccessGroupReducer(state, action) {
  return instance.reduce(state, action)
}

export const reducerPath = 'access-group'
