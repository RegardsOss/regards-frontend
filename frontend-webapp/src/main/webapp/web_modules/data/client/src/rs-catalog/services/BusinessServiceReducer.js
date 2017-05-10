/**
 * LICENSE_PLACEHOLDER
 */
import { BasicListReducers } from '@regardsoss/store-utils'
import { BusinessPluginConfigurationConfiguration } from '@regardsoss/api'
import BusinessServiceActions from './BusinessServiceActions'

export class BusinessServiceReducer extends BasicListReducers {
  constructor(namespace) {
    super(BusinessPluginConfigurationConfiguration, new BusinessServiceActions(namespace,
      BusinessServiceActions.ServiceScopes.ONE_DATASET)) // using any scope, no consequence on reduction
  }
}

/** Closure builder for reducer function */
export default (namespace) => {
  const reducerInstance = new BusinessServiceReducer(namespace)
  return (state, action) => reducerInstance.reduce(state, action)
}
