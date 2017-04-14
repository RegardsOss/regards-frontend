import { BasicListReducers } from '@regardsoss/store-utils'
import { ResourceAccessConfiguration } from '@regardsoss/api'
import RoleResourceActions from './RoleResourceActions'

/**
 * Redux Reducer for RoleResource actions.
 *
 * To user thoses actions, you need to pass the <namespace> parameter
 *
 * namespace : String, must be the same namespace defined in the associated Reducer.
 *
 * @author Sébastien Binda
 */
class RoleResourceReducers extends BasicListReducers {
  constructor(namespace) {
    super(ResourceAccessConfiguration, new RoleResourceActions(namespace))
  }
}

export default (namespace) => {
  const instance = new RoleResourceReducers(namespace)
  return (state, action) => instance.reduce(state, action)
}
