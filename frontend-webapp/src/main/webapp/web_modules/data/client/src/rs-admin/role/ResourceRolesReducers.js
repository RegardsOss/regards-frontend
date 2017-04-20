import { BasicListReducers } from '@regardsoss/store-utils'
import { RoleConfiguration } from '@regardsoss/api'
import ResourceRolesActions from './ResourceRolesActions'

/**
 * Redux Reducer for RolesForResource actions.
 *
 * To user thoses actions, you need to pass the <namespace> parameter
 *
 * namespace : String, must be the same namespace defined in the associated Reducer.
 *
 * @author Sébastien Binda
 */
class ResourceRolesReducers extends BasicListReducers {
  constructor(namespace) {
    super(RoleConfiguration, new ResourceRolesActions(namespace))
  }
}

export default (namespace) => {
  const instance = new ResourceRolesReducers(namespace)
  return (state, action) => instance.reduce(state, action)
}
