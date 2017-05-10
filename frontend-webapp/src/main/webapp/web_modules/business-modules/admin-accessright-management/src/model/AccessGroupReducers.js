/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableReducers } from '@regardsoss/store-utils'
import { AccessGroupConfiguration } from '@regardsoss/api'
import AccessGroupActions from './AccessGroupActions'

class AccessGroupReducers extends BasicPageableReducers {
  constructor() {
    super(AccessGroupConfiguration, AccessGroupActions)
  }
}

const instance = new AccessGroupReducers()

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export default function (state, action) {
  return instance.reduce(state, action)
}
