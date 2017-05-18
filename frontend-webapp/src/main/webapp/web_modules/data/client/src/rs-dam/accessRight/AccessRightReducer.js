/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableReducers } from '@regardsoss/store-utils'
import { AccessRightConfiguration } from '@regardsoss/api'
import AccessRightActions from './AccessRightActions'
/**
 * Redux store reducer for
 */
/**
 * Redux Reducer for  Attribute Model entities
 * @author Léo Mieulet
 */
class AccessRightReducer extends BasicPageableReducers {
  constructor(namespace) {
    super(AccessRightConfiguration, new AccessRightActions(namespace))
  }
}

export default (namespace) => {
  const instance = new AccessRightReducer(namespace)
  return (state, action) => instance.reduce(state, action)
}
