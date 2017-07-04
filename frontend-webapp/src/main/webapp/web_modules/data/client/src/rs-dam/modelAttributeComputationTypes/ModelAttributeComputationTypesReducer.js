/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicListReducers } from '@regardsoss/store-utils'
import { ModelAttributeComputationTypesConfiguration } from '@regardsoss/api'
import ModelAttributeComputationTypesActions from './ModelAttributeComputationTypesActions'

/**
 * Redux store reducer for pluginConf and pluginMetaData allowed per java type (string, integer,..)
 */
class ModelAttributeComputationTypesReducer extends BasicListReducers {
  constructor(namespace) {
    super(ModelAttributeComputationTypesConfiguration, new ModelAttributeComputationTypesActions(namespace))
  }
}

export default (namespace) => {
  const instance = new ModelAttributeComputationTypesReducer(namespace)
  return (state, action) => instance.reduce(state, action)
}
