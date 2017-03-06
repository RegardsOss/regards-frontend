/**
 * LICENSE_PLACEHOLDER
 */
import { BasicListReducers } from '@regardsoss/store-utils'
import { AccessesConfiguration } from '@regardsoss/api'
import AccessesActions from './AccessesActions'

class AccessesReducers extends BasicListReducers {
  constructor() {
    super(AccessesConfiguration, AccessesActions)
  }
}

const instance = new AccessesReducers()
export default instance

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export function getAccessesReducer(state, action) {
  return instance.reduce(state, action)
}
