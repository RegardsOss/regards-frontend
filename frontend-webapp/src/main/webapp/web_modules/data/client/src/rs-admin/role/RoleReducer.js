import { BasicListReducers } from '@regardsoss/store-utils'
import { RoleConfiguration } from '@regardsoss/api'
import RoleActions from './RoleActions'

/**
 * Redux Reducer for ProjectActions actions.
 *
 * To user thoses actions, you need to pass the <namespace> parameter
 *
 * namespace : String, must be the same namespace defined in the associated Reducer.
 *
 * @author Sébastien Binda
 */
class RoleReducers extends BasicListReducers {
  constructor(namespace) {
    super(RoleConfiguration, new RoleActions(namespace))
  }
}

export default (namespace) => {
  const instance = new RoleReducers(namespace)
  return (state, action) => instance.reduce(state, action)
}
