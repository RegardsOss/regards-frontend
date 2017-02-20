/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableReducers } from '@regardsoss/store-utils'
import { AccessRightConfiguration } from '@regardsoss/api'
import AccessRightActions from './AccessRightActions'

class AccessRightReducers extends BasicPageableReducers {
  constructor() {
    super(AccessRightConfiguration, AccessRightActions)
  }

}

const instance = new AccessRightReducers()

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export default function (state, action) {
  return instance.reduce(state, action)
}
